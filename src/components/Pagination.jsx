import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';

function Pagination ({ rowsOptions, onRowsPerPageChange, currPage, totalPages, rowsPerPage, totalNum, onPageChange }) {
	const start = (currPage - 1) * rowsPerPage + 1;
	const end = (currPage * rowsPerPage) < totalNum ? currPage * rowsPerPage : totalNum;

	const rowsOption = rowsOptions?.map(row => (<MenuItem sx={{ height: 25 }} key={row} value={row}>{row}</MenuItem>));
	return (
		<Paper sx={{ p: 1, m: '5px', position: 'absolute', bottom: 0, left: 0 }}>
			<Stack spacing={2} pt={1} direction='row' justifyContent='space-between' alignItems='center' overflow='auto'>
				<FormControl sx={{ minWidth: 120 }}>
					<InputLabel id='rows-per-page-label'>Rows Per Page</InputLabel>
					<Select
						labelId='rows-per-page-label'
						size='small'
						label='rows per page'
						value={rowsPerPage}
						onChange={onRowsPerPageChange}
					>
						{rowsOption}
					</Select>
				</FormControl>
				<Typography variant='body1'>{start} - {end} Results</Typography>
				<Stack spacing={2} direction='row' alignItems='center'>
					<IconButton onClick={() => onPageChange(-1)} > <ArrowLeft /> </IconButton>
					<Typography whiteSpace='nowrap'>{currPage} of {totalPages} Pages</Typography>
					<IconButton onClick={() => onPageChange(1)}> <ArrowRight /> </IconButton>
				</Stack>
			</Stack>
		</Paper>

	);
}

export default Pagination;