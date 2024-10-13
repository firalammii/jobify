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
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import { companiesTableheads } from '../data/table-heads-data';

function TableCompanies ({ selectModal }) {
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	// const [page, setPage] = React.useState();

	const dispatch = useDispatch();
	const axios = useAxiosPrivate();



	const { companies, totalCompanies, currPage, totalPages } = useSelector(state => state.company);

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

	return (
		<section>
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
								companies?.map((body, index) => {
									return (
										<TableRow
											key={body?._id}
											hover
											role="checkbox"
											tabIndex={-1}
											style={{ cursor: "pointer" }}
											onClick={() => selectModal(body)}
										>
											<TableCell>{index + 1}</TableCell>
											<TableCell>{body?.Logo}</TableCell>
											<TableCell>{body?.companyName}</TableCell>
											<TableCell>{body.website}</TableCell>
											<TableCell>{body.telNumber?.line + "  " + body.telNumber?.mobile}</TableCell>
											<TableCell>{body?.location?.city}, {body?.location?.country} </TableCell>
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
					count={totalCompanies}
					rowsPerPage={10}
					page={currPage - 1}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</section>
	);
}

export default TableCompanies;