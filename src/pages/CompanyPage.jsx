import React, { useEffect, useState } from 'react';
import { CircularProgress, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import { rowsOptions } from '../data/tableHeads';
import { fetchCompaniesFailure, fetchCompaniesStart, fetchCompaniesSuccess } from '../redux/companySlice';
import Company from './Company';
import TableCompany from '../components/TableCompany';
import { LINK_TO } from '../data/appData';

const url = "/api/companies";
const CompanyPage = () => {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(rowsOptions[0]);

	const dispatch = useDispatch();
	const axios = useAxiosPrivate();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchCompaniesStart());
		const query = `?page=${page}&limit=${rowsPerPage}`;
		let isMounted = true;
		const controller = new AbortController();

		const fetchCompanies = async () => {
			try {
				const { data } = await axios.get(url + query, {
					signal: controller.signal
				});

				if (data.success === false)
					dispatch(fetchCompaniesFailure(data.message));

				isMounted && dispatch(fetchCompaniesSuccess(data));
			} catch (err) {
				console.error(err);
				dispatch(fetchCompaniesFailure(err));
				navigate({ from: location, replace: true });
			}
		};
		fetchCompanies();
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [rowsPerPage, page]);


	const { loading, error, companies, totalNum, currPage, totalPages } = useSelector(state => state.company);

	const handleAdd = () => {
		navigate(LINK_TO.addCompany);
	};
	const handleChangePage = async (value) => {
		if (currPage + value > totalPages || currPage + value <= 0)
			return;
		setPage(prev => prev + value);
	};

	const handleChangeRowsPerPage = (e) => {
		setPage(1);
		setRowsPerPage(e.target.value);
	};

	const selectModal = (item) => {
		// setModal(item);
		navigate(LINK_TO.viewCompany, { state: item });
	};

	return (
		<div className='gridfullcol grid11row'>
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