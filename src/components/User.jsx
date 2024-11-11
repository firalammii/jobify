import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROLES } from '../data/roles';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/userSlice';
import { Alert, CloseButton, } from './';
import { userURL } from '../api/urls';
import '../css/overlay.scss';
import { LINK_TO } from '../data/appData';

const User = () => {
	const [user, setUser] = useState({});
	const [alert, setAlert] = useState({ visible: false, success: false, message: "" });

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state } = useLocation();
	const axios = useAxiosPrivate();

	const { currUser } = useSelector(state => state.user);
	const isCurrUser = state?._id === currUser._id;
	const url = `${userURL}/${state?._id}`;

	useEffect(() => {
		if (isCurrUser)
			navigate(LINK_TO.userProfile);
		if (state) {
			setUser(state);
		}
	}, []);


	const back = () => navigate(-1);
	const closeAlert = () => setAlert({ ...alert, visible: false });

	const alterRoles = async (role) => {
		try {
			dispatch(updateUserStart());
			const { data } = await axios.put(url, role ? { role } : { roles: [ROLES.user] });
			const successMsg = role ? `Making the User ${role === ROLES.admin ? 'An' : 'A'} ${role} User, Operation is successfull !!` : 'Removing All User Roles Operation is successfull';
			dispatch(updateUserSuccess(data));
			setUser(data);
			setAlert({ visible: true, success: true, message: successMsg });
		} catch (error) {
			dispatch(updateUserFailure(error));
			const msg = error.response?.data?.message;
			setAlert({ visible: true, success: false, message: msg ? msg : error.message });
		}
	};

	const removeUser = async () => {
		try {
			dispatch(deleteUserStart());
			const { data } = await axios.delete(url);
			const removalSuccessMsg = "Deleting User Operation is successfull";
			setAlert({ visible: true, success: true, message: removalSuccessMsg });
			dispatch(deleteUserSuccess(data));
			setUser(data);
		} catch (error) {
			console.error(error)
			dispatch(deleteUserFailure(error));
			const msg = error.response?.data?.message;
			setAlert({ visible: true, success: false, message: msg ? msg : error.message });
		}
	};

	return (
		<div className='gridfullcol grid11row p-10 grid gap-10 shadow-md w-3/5 h-4/5 bg-white m-auto rounded-xl relative'>
			{
				alert.visible ?
					<Alert message={alert.message} success={alert.success} returnFunction={closeAlert} />
					:
					<>
						<div className='flex flex-col gap-7 items-center md:flex-row'>
							<img
								className='rounded-full h-24 w-24 object-cover'
								src={user?.avatar}
								alt='profile' />
							<div >
								<p className='font-bold'>{user?.firstName} {user?.lastName}</p>
								<p className='font-light'>{user?.email} </p>
								<p className='font-extralight capitalize'>{user?.roles?.map((role, i) => <span key={role}>{i + 1 < user?.roles.length ? `${role}, ` : role}</span>)} </p>
							</div>
						</div>

						<div className='flex flex-wrap  gap-5 justify-center items-center max-h-12'>
							<button disabled={isCurrUser} onClick={() => alterRoles(ROLES.super)} className='min-w-36 h-4/5 rounded-md bg-green-600 text-white whitespace-nowrap '>Make Super</button>
							<button disabled={isCurrUser} onClick={() => alterRoles(ROLES.admin)} className='min-w-36 h-4/5 rounded-md bg-blue-600 text-white whitespace-nowrap '>Make Admin</button>
							<button disabled={isCurrUser} onClick={() => alterRoles()} className='min-w-36 h-4/5 rounded-md bg-gray-600 text-white whitespace-nowrap '>Deny Access</button>
							<button disabled={isCurrUser} onClick={removeUser} className='min-w-36 h-4/5 rounded-md bg-red-600 text-white whitespace-nowrap '>Remove User</button>
						</div>
						<div className='h-10 flex items-center pl-10 '>
							<p className={alert.success ? 'text-green-600' : 'text-red-600'}>{alert.message}</p>
						</div>
						<div className='absolute top-4 right-4'>
							<CloseButton onClose={back} />
						</div>
					</>
			}
		</div>
	);
}

export default User;