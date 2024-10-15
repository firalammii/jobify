import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import React, { memo } from 'react';

function Pagination ({ rowsOptions, onRowsPerPageChange, currPage, totalPages, rowsPerPage, onPageChange }) {

	return (
		<section className=' text-slate-700 p-5 flex justify-between bg-slate-200 rounded-md shadow-md' >
			<div className='flex gap-1 w-1/3 items-center  whitespace-nowrap '>
				Rows per page:
				<div className='flex gap-1 w-10 overflow-scroll'>
					<select
						onChange={onRowsPerPageChange}
						value={rowsPerPage}
						className='border-none outline-none w-24 p-1 bg-slate-100 rounded'>
						{
							rowsOptions?.map(row => (<option key={row} value={row}>{row}</option>))
						}
					</select>
				</div>
			</div>

			<div className='w-2/3 flex gap-3 justify-center items-center rounded-md max-w-96'>
				<button onClick={() => onPageChange(-1)} className='w-16 flex items-center justify-center rounded-full hover:bg-slate-200 hover:text-white'><ArrowLeft /></button>
				<div className='flex gap-3 items-center'>
					<span>page </span>
					<span>{currPage} </span>
					<span>of </span>
					<span>{totalPages}</span>
					<span>pages</span>
				</div>
				<button onClick={() => onPageChange(1)} className='w-16 flex items-center justify-center rounded-full hover:bg-slate-200 hover:text-white'><ArrowRight /></button>
			</div>

		</section>
	);
}

export default Pagination;