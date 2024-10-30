import React from 'react';
import { CircularProgress, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { fetchCompaniesFailure, fetchCompaniesStart, fetchCompaniesSuccess } from '../redux/companySlice';
import TableCompany from '../components/TableCompany';
import { LINK_TO } from '../data/appData';
import { companyURL } from '../api/urls';

const CompanyPage = () => {

	const dispatch = useDispatch();
	const axios = useAxiosPrivate();
	const navigate = useNavigate();	

	const { loading, totalNum, currPage, rowsPerPage, totalPages } = useSelector(state => state.company);

	const fetchCompanies = async (page, limit) => {
		dispatch(fetchCompaniesStart());
		const query = `?page=${page}&limit=${limit}`;
		//search query
		try {
			const { data } = await axios.get(companyURL + query);
			dispatch(fetchCompaniesSuccess(data));
		} catch (error) {
			console.error(error);
			dispatch(fetchCompaniesFailure(error.message || "Error While Fetching Companies"));
			navigate({ from: location, replace: true });
		}
	};

	const handleAdd = () => {
		navigate(LINK_TO.addCompany);
	};

	const handleChangePage = async (value) => {
		let page = 1;
		if (currPage + value > totalPages)
			page = 1;
		else if (currPage + value <= 0)
			page = totalPages;
		else page = currPage + value;
		await fetchCompanies(page, rowsPerPage);
	};

	const handleChangeRowsPerPage = async (event) => {
		event.preventDefault();
		await fetchCompanies(1, event.target.value);
	};

	const selectModal = (item) => {
		navigate(LINK_TO.viewCompany, { state: item });
	};

	return (
		<div className='gridfullcol grid11row w-full h-full'>
			{
				loading ?
					<CircularProgress />
					:
					<section className='w-full h-full relative'>
						<header className='flex justify-between text-slate-700 capitalize bg-slate-100 shadow-md p-2 text-sm font-bold'  >
							<h1 className='uppercase '>Companies table</h1>
							<span>total: {totalNum} Companies</span>
						</header>
						<section className='bg-white pb-14'>
							<TableCompany
								handleAdd={handleAdd}
								handleChangePage={handleChangePage}
								handleChangeRowsPerPage={handleChangeRowsPerPage}
								selectModal={selectModal}
							/>
						</section>
					</section>
			}
		</div>
	);
};
export default CompanyPage;