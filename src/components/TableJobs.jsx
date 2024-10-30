import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Pagination from './Pagination';
import AddButton from './AddButton';
import { jobsTableHeads, rowsOptions } from '../data/tableHeads';
import { useSelector } from 'react-redux';

const TableJobs = ({ handleAdd, handleChangePage, handleChangeRowsPerPage, selectModal }) => {

	const { jobs, currPage, totalNum, totalPages, rowsPerPage } = useSelector(state => state.job);

	return (
		<Paper>
			<TableContainer
				style={{ height: "calc(100vh - 0.1px)", paddingBottom: "200px" }}
				// style={{ height: "calc(100vh - 156px)" }}
			>
				<Table
					stickyHeader
					aria-label="a sticky dense table"
				// size='small'
				>
					<TableHead>
						<TableRow>
							{jobsTableHeads?.map((column) => (<TableCell key={column.id}> {column.label}</TableCell>))}
						</TableRow>
					</TableHead>
					<TableBody style={{ overflow: "auto", height: "80%" }} >
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
										<TableCell>{(currPage - 1) * rowsPerPage + index + 1}</TableCell>
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
			{/* <AddButton onClick={handleAdd} />
			<Pagination
				rowsOptions={rowsOptions}
				rowsPerPage={rowsPerPage}
				totalNum={totalNum}
				totalPages={totalPages}
				currPage={currPage}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/> */}
		</Paper>
	);
}

export default TableJobs;