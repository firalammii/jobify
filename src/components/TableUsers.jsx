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
import Pagination from './Pagination';

export default function UsersTable ({ title, tableHeads, tableBody, selectModalUser }) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		console.log(newPage);
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (

		<Paper sx={{ width: '100%', overflow: 'hidden', }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{tableHeads?.map((column) => (<TableCell key={column.id}> {column.label}</TableCell>))}
						</TableRow>
					</TableHead>
					<TableBody>
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
										<TableCell>
											<img className='rounded-full h-7 w-7 object-cover' src={body.avatar} alt='profile' />
										</TableCell>
										<TableCell>{body?.firstName} {body.lastName}</TableCell>
										<TableCell>{body?.email}</TableCell>
										<TableCell>{nroles?.map((role, i) => (<span key={role}>{(nroles.length === 0 ? "-----" : i + 1 < nroles.length) ? role + ", " : role}</span>))}</TableCell>
									</TableRow>
								);
							}
							)

						}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={tableBody.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
