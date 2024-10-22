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

const UsersPage = () => {

	const [modal, setModal] = useState(null);
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(rowsOptions[0]);

	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const query = `?page=${page}&limit=${rowsPerPage}`;

		const getUsers = async () => {
			dispatch(fetchUsersStart());
			try {
				const response = await axiosPrivate.get(userURL + query, {
					signal: controller.signal
				});
				console.log(response.data);
				isMounted && dispatch(fetchUsersSuccess(response.data));
			} catch (err) {
				console.error(err);
				dispatch(fetchUsersFailure(err));
				navigate({ from: location, replace: true });
			}
		};

		getUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};

	}, [page, rowsPerPage]);

	const { users, loading, error, totalNum, totalPages, currPage, length } = useSelector(state => state?.user);

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

	const handleAdd = () => {
		navigate(LINK_TO.addUser);
	};
	return (
		<div className='gridfullcol grid11row'>
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