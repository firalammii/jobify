import { useEffect, } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, } from "react-router-dom";

import { ListingTable, Pagination, TableTitle, } from '../../components';
import { setTargetUser } from "../../redux/userSlice";
import { fetchUsers } from "../../@api/api/users_api";
import { LINK_TO } from '../../data/appData';
import { API_STATUS } from '../../@api/promiseStatus';
import { usersTableBody, rowsOptions, usersTableHeads } from '../../data/tables';

const UsersPage = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { users, status, totalNum, totalPages, currPage, rowsPerPage } = useSelector(state => state.users);

	useEffect(() => {
		let isMounted = true;
		if (isMounted && status === API_STATUS.idle) {
			dispatch(fetchUsers());
			console.log("users call");
		}
		return () => {
			isMounted = false;
		};
	}, [status, dispatch]);

	const handleChangeRowsPerPage = (rpp) => {
		dispatch(fetchUsers(`/?page=${1}&limit=${rpp}`));
	};
	const handleChangePage = (amount) => {
		const page = currPage + amount > totalPages ? 1 : currPage + amount <= 0 ? totalPages : currPage + amount;
		dispatch(fetchUsers(`/?page=${page}&limit=${rowsPerPage}`));
	};
	const selectModal = (item) => {
		dispatch(setTargetUser(item));
		navigate(LINK_TO.editUser, { state: item });
		// setModal(item);
	};

	if (status === API_STATUS.loading)
		return (<CircularProgress />);

	return (
		<Box>
			<TableTitle title={"Users Table"} totalNum={totalNum} />
			<ListingTable
				tableHeads={usersTableHeads}
				tableBody={users}
				tableBodyKeys={usersTableBody}
				startAt={(currPage - 1) * rowsPerPage}
				selectModal={selectModal}
			/>
			<Pagination
				rowsOptions={rowsOptions}
				rowsPerPage={rowsPerPage}
				totalPages={totalPages}
				currPage={currPage}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
};

export default UsersPage;