import React, { useEffect, useState } from 'react';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import { ROLES } from '../data/roles';
import { companiesTableheads, rowsOptions } from '../data/table-heads-data';
import { fetchCompaniesFailure, fetchCompaniesStart, fetchCompaniesSuccess } from '../redux/companySlice';
import Company from './Company';
import { AddButton, Pagination } from '../components';

const url = "/api/companies";

function Companies () {
	const [modal, setModal] = useState(null);
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


	const { length: currTableLen, loading, error, companies, totalNum, currPage, totalPages } = useSelector(state => state.company);

	// const companyObj = useSelector(state => state.company);
	// console.log(companyObj)
	const handleAdd = () => {
		navigate('/add-company');
	}
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
		setModal(item);
	};
	const back = () => {
		setModal(null);
	};

	return (
		<section>
			{companies.map(data => (<Company key={data._id} data={data} />))}
			{
				loading ?
					<CircularProgress />
					:
					modal ?
						<Company data={modal} back={back} />
						:
						<Paper sx={{ width: '100%', overflow: 'hidden', }}>
							<TableContainer
								sx={{ height: "calc(100vh - 140px)", }}
							>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											{companiesTableheads?.map((column) => (<TableCell key={column.id}> {column.label}</TableCell>))}
										</TableRow>
									</TableHead>
									<TableBody style={{ overflow: "auto", }} >
										{
											companies?.map((body, index) => {
												return (
													<TableRow
														key={body?._id}
														hover
														role="checkbox"
														tabIndex={-1}
														style={{ cursor: "pointer", height: "40px" }}
														onClick={() => selectModal(body)}
													>
														<TableCell style={{ height: "40px" }}>{index + 1}</TableCell>
														<TableCell><img className='rounded-full h-7 w-7 object-cover' src={body.companyLog} /></TableCell>
														<TableCell>{body?.companyName}</TableCell>
														<TableCell>{body.website}</TableCell>
														<TableCell>
															<p>{body.telNumber?.line}</p>
															<p>{body.telNumber?.mobile}</p>
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
			}
		</section >
	);
}

export default Companies;