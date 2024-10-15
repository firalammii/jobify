import React, { useState, useEffect } from 'react';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

import { AddButton, Pagination, User } from '../components';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from "../redux/userSlice";
import { rowsOptions, usersTableHeads } from "../data/table-heads-data";
import { ROLES } from '../data/roles';
import { AddCircleRounded, AddHome, PlusOneRounded } from '@mui/icons-material';

const url = '/api/users';

const Users = () => {
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
				const response = await axiosPrivate.get(url + query, {
					signal: controller.signal
				});
				console.log(response.data);
				isMounted && dispatch(fetchUsersSuccess(response.data));
			} catch (err) {
				console.error(err);
				dispatch(fetchUsersFailure(err))
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
		navigate('/add-user');
	}

	return (
		<>
			{
				loading ?
					<CircularProgress />
					:
					modal ?
						<User user={modal} onClose={back} />
						:
						<Paper sx={{ width: '100%', overflow: 'hidden', }}>
							<TableContainer
								sx={{ height: "calc(100vh - 140px)", }}
							>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											{usersTableHeads?.map((column) => (<TableCell key={column.id}> {column.label}</TableCell>))}
										</TableRow>
									</TableHead>
									<TableBody>
										{
											users?.map((body, index) => {
												const nroles = body?.roles?.filter(role => role !== ROLES.user);
												return (
													<TableRow
														key={body?._id}
														hover
														role="checkbox"
														tabIndex={-1}
														style={{ cursor: "pointer" }}
														onClick={() => selectModal(body)}
													>
														<TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
														<TableCell>
															<img className='rounded-full h-7 w-7 object-cover' src={body.avatar} alt='profile' />
														</TableCell>
														<TableCell>{body?.firstName} {body.lastName}</TableCell>
														<TableCell>{body?.email}</TableCell>
														<TableCell>{nroles?.map((role, i) => (<span key={role}>{(nroles.length === 0 ? "-----" : i + 1 < nroles.length) ? role + ", " : role}</span>))}</TableCell>
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
		</>
	);
};

export default Users;
