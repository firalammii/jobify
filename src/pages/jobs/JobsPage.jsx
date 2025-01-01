import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import { jobsSelector, } from '../../redux/jobSlice';
import { currentUserSelector } from '../../redux/authSlice';
import { findJob, fetchJobs, } from '../../@api/api/jobs_api';
import { Pagination, TableTitle, ListingTable } from '../../components';
import { jobsTableBody, jobsTableHeads, rowsOptions } from '../../data/tables';
import { LINK_TO } from '../../data/appData';
import { API_STATUS } from '../../@api/promiseStatus';
import { MuiPagination } from '../../components';

const JobsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const search = useLocation().pathname;

	const isSearching = search.includes('search');

	const { jobs, totalNum, currPage, rowsPerPage, totalPages, status, error, searchQuery } = useSelector(jobsSelector);
	const currentUser = useSelector(currentUserSelector);

	useEffect(() => {
		let isMounted = true;
		if (isMounted && status === API_STATUS.idle && !isSearching) {
			dispatch(fetchJobs());
		}
		return () => {
			isMounted = false;
		};
	},
		[currentUser, status, dispatch]
	);

	const selectModal = (item) => {
		dispatch(findJob(item._id));
		navigate(LINK_TO.viewJob, { state: item });
	};

	const handleChangeRowsPerPage = (e) => {
		const limit = Number(e.target.value);
		dispatch(fetchJobs(`/?page=${1}&limit=${limit}&${searchQuery}`));
	};

	const handleChangePage = (amount) => {
		const page = currPage + amount > totalPages ? 1 : currPage + amount <= 0 ? totalPages : currPage + amount;
		dispatch(fetchJobs(`/?page=${page}&limit=${rowsPerPage}&${searchQuery}`));
	};

	let pageContent = <h2 className='text-2xl'>initial content</h2>;
	if (status === API_STATUS.loading) {
		pageContent =
			<Box mt='1em' display='flex' flexDirection='column' gap='1rem' alignItems='center'>
				<CircularProgress />
				<p>loading please wait...</p>
			</Box>;
	} else if (status === API_STATUS.succeeded) {
		pageContent =
			<Box p={'5px'}>
				<TableTitle title={"Jobs table"} totalNum={totalNum} />
				<ListingTable
					tableHeads={jobsTableHeads}
					tableBody={jobs}
					tableBodyKeys={jobsTableBody}
					startAt={(currPage - 1) * rowsPerPage}
					selectModal={selectModal}
				/>
				{/* {!isSearching &&
					<AddButton onClick={handleAdd} />
				} */}
				<Pagination
					rowsOptions={rowsOptions}
					rowsPerPage={rowsPerPage}
					totalNum={totalNum}
					totalPages={totalPages}
					currPage={currPage}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Box>;
	} else if (status === API_STATUS.failed) {
		pageContent = <h2 className='text-red-500 text-2xl'>{error.data}</h2>;
	}
	return pageContent;
};

export default JobsPage;