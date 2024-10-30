import React, { useEffect, useState } from 'react';
import { rowsOptions } from '../data/tableHeads';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import TableJobs from '../components/TableJobs';
import { fetchJobsFailure, fetchJobsStart, fetchJobsSuccess, pageChange, rowsPerPageChange } from '../redux/jobSlice';

import { jobURL } from '../api/urls';
import { AddButton, JobDatails, Pagination } from '../components';
import { LINK_TO } from '../data/appData';

const JobsPage = () => {

	const dispatch = useDispatch();
	const axios = useAxiosPrivate();
	const navigate = useNavigate();

	const { jobs, totalNum, length, currPage, rowsPerPage, totalPages, error, loading } = useSelector(state => state.job);

	const fetchJobs = async (page, limit) => {
		dispatch(fetchJobsStart());
		const query = `?page=${page}&limit=${limit}`;
		//query add companyId
		try {
			const { data } = await axios.get(jobURL + query);
			dispatch(fetchJobsSuccess(data));
		} catch (error) {
			console.error(error);
			dispatch(fetchJobsFailure(error));
			// navigate({ from: location, replace: true });
		}
	};

	const handleAdd = () => {
		navigate(LINK_TO.addJob);
	};

	const handleChangePage = async (value) => {
		let page = 1;
		if (currPage + value > totalPages)
			page = 1;
		else if (currPage + value <= 0)
			page = totalPages;
		else page = currPage + value;
		await fetchJobs(page, rowsPerPage);
	};

	const handleChangeRowsPerPage = async (event) => {
		event.preventDefault();
		await fetchJobs(1, event.target.value);
	};

	const selectModal = (item) => {
		navigate(LINK_TO.viewJob, { state: item })
	};

	return (
		<div className='gridfullcol grid11row w-full h-full'>
			{
				loading ?
					<CircularProgress />
					:
					<section className='w-full h-full relative'>
						<header className='flex justify-between text-slate-700 capitalize bg-slate-100 shadow-md p-2 text-sm font-bold'  >
							<h1 className='uppercase '>Jobs table</h1>
							<span>total: {totalNum} Jobs</span>
						</header>
						<section className='bg-white pb-14'>
							<TableJobs
								handleAdd={handleAdd}
								handleChangePage={handleChangePage}
								handleChangeRowsPerPage={handleChangeRowsPerPage}
								selectModal={selectModal}
							/>
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
						</section>
					</section>
			}
		</div>
	);
};

export default JobsPage;