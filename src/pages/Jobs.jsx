import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ROLES } from '../data/roles';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import { jobsTableHeads } from '../data/table-heads-data';

import { useNavigate } from 'react-router-dom';
import { fetchJobsFailure, fetchJobsStart, fetchJobsSuccess } from '../redux/jobSlice';
import { JobDatails } from '../components';
import Pagination from '../components/Pagination';

const url = "/api/jobs";
const rowsOptions = [4, 8, 12];

function Jobs () {
	const [rowsPerPage, setRowsPerPage] = React.useState(rowsOptions[0]);
	const [page, setPage] = React.useState(1);
	const [modal, setModal] = React.useState(null);

	const dispatch = useDispatch();
	const axios = useAxiosPrivate();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchJobsStart());
		const query = `page=${page}&limit=${rowsPerPage}`;
		let isMounted = true;
		const controller = new AbortController();
		const fetchJobs = async () => {

			try {
				const response = await axios.get(url + `?${query}`, {
					signal: controller.signal
				});

				isMounted && dispatch(fetchJobsSuccess(response.data));
			} catch (err) {
				console.error(err);
				dispatch(fetchJobsFailure(err));
				navigate({ from: location, replace: true });

			}
		};

		fetchJobs();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [page, rowsPerPage]);

	const { jobs, totalNum, length, currPage, totalPages, error, loading } = useSelector(state => state.job);

	const handleChangePage = async (value) => {
		if (currPage + value > totalPages || currPage + value <= 0)
			return;
		setPage(prev => prev + value);
	};

	const handleChangeRowsPerPage = (e) => {
		setPage(1);
		setRowsPerPage(e.target.value);
	};

	const selectModal = (item) => {
		setModal(item);
	};
	const back = () => {
		setModal(null);
	};

	return (
		<section>
			{
				loading ?
					<CircularProgress />
					:
					modal ?
						<JobDatails data={modal} back={back} />
						:
						<Paper sx={{ width: '100%', overflow: 'hidden', }}>
							<TableContainer
								sx={{ height: "calc(100vh - 140px)", }}
							>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											{jobsTableHeads?.map((column) => (<TableCell key={column.id}> {column.label}</TableCell>))}
										</TableRow>
									</TableHead>
									<TableBody style={{ overflow: "auto" }} >
										{
											jobs?.map((body, index) => {
												return (
													<TableRow
														key={body?._id}
														hover
														role="checkbox"
														tabIndex={-1}
														style={{ cursor: "pointer" }}
														onClick={() => selectModal(body)}
													>
														<TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
														<TableCell>{body?.title}</TableCell>
														<TableCell>{body?.jobType}</TableCell>
														<TableCell>{body.salary?.minSalary} - {body?.salary?.maxSalary} {body.salary?.currency}</TableCell>
														<TableCell>{body.experience?.minYears} - {body?.experience?.maxYears} Years</TableCell>
														{/* <TableCell>{body?.remoteOption}</TableCell> */}
														<TableCell>{body?.location?.city}, {body?.location?.country} </TableCell>
														<TableCell>{new Date(body?.postingDate).toLocaleDateString()}</TableCell>
														<TableCell>{body?.status}</TableCell>
													</TableRow>
												);
											})
										}
									</TableBody>
								</Table>
							</TableContainer>
							<Pagination
								rowsOptions={rowsOptions}
								rowsPerPage={rowsPerPage}
								totalNum={totalNum}
								totalPages={totalPages}
								currPage={currPage}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
							{/* <TablePagination
								// rowsPerPageOptions={[10, 20, 50]}
								rowsPerPageOptions={rpp}
								// rowsPerPageOptions={[4, 25, 100]}
								component="div"
								count={totalNum}
								rowsPerPage={rowsPerPage}
								page={currPage - 1}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/> */}
						</Paper>
			}
		</section>
	);
}

export default Jobs;