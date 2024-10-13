import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ROLES } from '../data/roles';
import { useDispatch } from 'react-redux';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const JobsListingTable = ({ currPage, totalJobs, totalPages, tableHeads, tableBody, selectModalUser }) => {
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [page, setPage] = React.useState(currPage);
	const dispatch = useDispatch();

	const axios = useAxiosPrivate();

	const handleChangePage = async (event, newPage) => {
		// dispatch(fetchJobsStart());

		const query = `page=${currPage + 1}&limit=${rowsPerPage}`;

		try {

			const response = await axios.get(`/api/jobs?${query}`);

			console.log("response: ", response);
			// dispatch(fetchJobsSuccess(response.data));

		} catch (error) {
			setErrMsg(error?.data?.message);
			dispatch(fetchJobsFailure());
		}



	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);

	};
	console.log(page);
	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', }}>
				<TableContainer
					sx={{ height: "calc(100vh - 140px)", }}
				>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{tableHeads?.map((column) => (<TableCell key={column.id}> {column.label}</TableCell>))}
							</TableRow>
						</TableHead>
						<TableBody style={{ overflow: "auto" }} >
							{
								tableBody?.map((body, index) => {
									const nroles = body?.roles?.filter(role => role !== ROLES.user);
									return (
										<TableRow
											key={body?._id}
											hover
											role="checkbox"
											tabIndex={-1}
											style={{ cursor: "pointer" }}
											onClick={() => selectModalUser(body)}
										>
											<TableCell>{index + 1}</TableCell>
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

			<TablePagination
				// rowsPerPageOptions={[10, 20, 50]}
				rowsPerPageOptions={[4, 8, 12]}
				// rowsPerPageOptions={[4, 25, 100]}
				component="div"
				count={totalJobs}
				rowsPerPage={4}
				page={currPage - 1}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default JobsListingTable;