import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

import { User } from '../components';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from "../redux/userSlice";
import { rowsOptions } from "../data/tableHeads";
import TableUsers from '../components/TableUsers';

import { userURL } from '../api/urls.js';
import { LINK_TO } from '../data/appData.js';
import { useFetchUsers } from '../hooks/useFetchUsers.js';

const UsersPage = () => {

	const [modal, setModal] = useState(null);

	const axios = useAxiosPrivate();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const fetchUsers = useFetchUsers();
	const fetchUsers = async (page, limit) => {
		dispatch(fetchUsersStart());
		const query = `?page=${page}&limit=${limit}`;
		//search
		try {
			const { data } = await axios.get(userURL + query);
			dispatch(fetchUsersSuccess(data));
		} catch (error) {
			console.error(error);
			dispatch(fetchUsersFailure(error.message || "Error While Fetching Users"));
		}
	};

	const { loading, totalNum, totalPages, currPage, rowsPerPage } = useSelector(state => state?.user);

	const back = () => {
		setModal(null);
	};

	const handleAdd = () => {
		navigate(LINK_TO.addUser);
	};

	const handleChangePage = async (value) => {
		let page = 1;
		if (currPage + value > totalPages)
			page = 1;
		else if (currPage + value <= 0)
			page = totalPages;
		else page = currPage + value;
		await fetchUsers(page, rowsPerPage);
	};

	const handleChangeRowsPerPage = async (event) => {
		event.preventDefault();
		await fetchUsers(1, event.target.value);
	};

	const selectModal = (item) => {
		navigate(LINK_TO.editUser, { state: item });
		// setModal(item);
	};

	return (
		<div className='gridfullcol grid11row w-full h-full'>
			{
				loading ?
					<CircularProgress />
					:
					modal ?
						<User user={modal} back={back} />
						:
						<section className='w-full h-full relative'>
							<header className='flex justify-between text-slate-700 capitalize bg-slate-100 shadow-md p-2 text-sm font-bold'  >
								<h1 className='uppercase '>Users table</h1>
								<span>total: {totalNum} Users</span>
							</header>
							<section className='bg-white pb-14'>
								<TableUsers
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

export default UsersPage;