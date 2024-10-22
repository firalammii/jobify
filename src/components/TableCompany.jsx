import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Pagination from './Pagination';
import AddButton from './AddButton';
import { companiesTableheads, jobsTableHeads, rowsOptions } from '../data/tableHeads';
import { useSelector } from 'react-redux';
import { Company } from '../pages';

const TableCompany = ({ handleAdd, handleChangePage, handleChangeRowsPerPage, selectModal }) => {

	const { companies, currPage, totalNum, totalPages, rowsPerPage } = useSelector(state => state.company);

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
							{companiesTableheads?.map((column) => (<TableCell key={column.id}> {column.label}</TableCell>))}
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
										<TableCell>{(currPage - 1) * rowsPerPage + index + 1}</TableCell>
										<TableCell><img className='rounded-full h-7 w-7 object-cover' src={body?.companyLogo} /></TableCell>
										<TableCell>{body?.companyName}</TableCell>
										<TableCell>{body?.website}</TableCell>
										<TableCell>
											<p>{body?.telNumber?.line}</p>
											<p>{body?.telNumber?.mobile}</p>
										</TableCell>
										<TableCell>{body?.location?.city}, {body?.location?.country} </TableCell>
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
				totalNum={totalNum}
				totalPages={totalPages}
				currPage={currPage}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default TableCompany;