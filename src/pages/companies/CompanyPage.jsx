import { Box, CircularProgress, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LINK_TO } from '../../data/appData';
import { rowsOptions } from '../../data/tables';
import { API_STATUS } from '../../@api/promiseStatus';
import { TableTitle, Pagination, CompanyAccordion } from '../../components';
import { companiesSelector } from '../../redux/companySlice';
import { useEffect } from 'react';
import { deleteCompany, fetchCompanies } from '../../@api/api/company_api';

const CompanyPage = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { companies, status, totalNum, currPage, rowsPerPage, totalPages } = useSelector(companiesSelector);

	useEffect(() => {
		let isMounted = true;
		if (isMounted && status === API_STATUS.idle) {
			dispatch(fetchCompanies(`/?page=${1}&limit=${rowsPerPage}`));
			console.log("companies call");
		}
		return () => {
			isMounted = false;
		};
	}, [status, dispatch]);

	const handleChangeRowsPerPage = (e) => {
		const limit = Number(e.target.value);
		dispatch(fetchCompanies(`/?page=${1}&limit=${limit}`));
	};

	const handleChangePage = (amount) => {
		const page = currPage + amount > totalPages ? 1 : currPage + amount <= 0 ? totalPages : currPage + amount;
		dispatch(fetchCompanies(`/?page=${page}&limit=${rowsPerPage}`));
	};

	const selectModal = (item) => {
		navigate(LINK_TO.viewCompany, { state: item });
	};
	const handleDeleteCompany = (id) => {
		dispatch(deleteCompany(id));
	};

	if (status === API_STATUS.loading)
		return (
			<Box >
				<CircularProgress />
			</Box>
		);

	return (
		<Box >
			<TableTitle title={"Companies Table"} totalNum={totalNum} currPage={currPage} rowsPerPage={rowsPerPage} />
			<CompanyAccordion
				tableBody={companies}
				selectModal={selectModal}
				deleteCompany={handleDeleteCompany}
			/>
			<Pagination
				rowsOptions={rowsOptions}
				rowsPerPage={rowsPerPage}
				totalNum={totalNum}
				totalPages={totalPages}
				currPage={currPage}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
};
export default CompanyPage;