import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Pagination from './Pagination';
import AddButton from './AddButton';
import { rowsOptions, usersTableHeads } from '../data/tableHeads';
import { useSelector } from 'react-redux';
import { ROLES } from '../data/roles';

const TableUsers = ({ handleAdd, handleChangePage, handleChangeRowsPerPage, selectModal }) => {

	const { users, currPage, totalPages, rowsPerPage } = useSelector(state => state.user);
	console.log(users)
	return (
		<Paper>
			<TableContainer
				style={{ height: "calc(100vh - 156px)" }}
			>
				<Table
					stickyHeader
					aria-label="a sticky dense table"
				// size='small'
				>
					<TableHead>
						<TableRow>
							{usersTableHeads?.map((column) => (<TableCell key={column.id}> {column.label}</TableCell>))}
						</TableRow>
					</TableHead>
					<TableBody style={{ overflow: "auto" }} >
						{
							users.map((body, index) => {
								const nroles = body?.roles?.filter(role => role !== ROLES.user);
								return (
									<TableRow
										key={body?._id}
										hover
										role="checkbox"
										tabIndex={-1}
										style={{ cursor: "pointer" }}
										onClick={() => selectModal(body)}
									>
										<TableCell>{(currPage - 1) * rowsPerPage + index + 1}</TableCell>
										<TableCell>
											<img className='rounded-full h-7 w-7 object-cover' src={body.avatar} alt='profile' />
										</TableCell>
										<TableCell>{body?.firstName} {body.lastName}</TableCell>
										<TableCell>{body?.email}</TableCell>
										<TableCell>{nroles?.map((role, i) => (<span key={role}>{(nroles.length === 0 ? "-----" : i + 1 < nroles.length) ? role + ", " : role}</span>))}</TableCell>

									</TableRow>
								);
							})
						}
					</TableBody>
				</Table>
			</TableContainer>
			<AddButton onClick={handleAdd} />
			<Pagination
				rowsOptions={rowsOptions}
				rowsPerPage={rowsPerPage}
				totalPages={totalPages}
				currPage={currPage}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default TableUsers;