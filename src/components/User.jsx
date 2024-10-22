import React, { useState } from 'react';
import { CloseRounded } from '@mui/icons-material';

import Button from './Button';

import '../css/overlay.scss';
import { ROLES, roles } from '../data/roles';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/userSlice';
import CloseButton from './CloseButton';
import Alert from './Alert';
import { userURL } from '../api/urls';

const User = ({ user, back }) => {
	const [alertMsg, setAlertMsg] = useState("");
	const url = `${userURL}/${user?._id}`;
	const dispatch = useDispatch();
	const axios = useAxiosPrivate();
	let success = false;
	const { currUser, users } = useSelector(state => state.user);

	const makeSuper = async () => {
		const alreadySuper = user?.roles?.includes(ROLES.super);
		if (alreadySuper)
			return;
		dispatch(updateUserStart());
		try {
			const roles = [...user?.roles, ROLES.super];
			const { data } = await axios.put(url, { roles });
			console.log(data);
			dispatch(updateUserSuccess(data));
			setAlertMsg("Operation successfull");
			success = true;
		} catch (error) {
			dispatch(updateUserFailure(error));
			setAlertMsg(error.message);
			success = false;
		}
	};
	const makeAdmin = async () => {
		const alreadyAdmin = user?.roles?.includes(ROLES.admin);
		const isCurrUser = user._id === currUser._id;
		if (alreadyAdmin)
			return;
		dispatch(updateUserStart());
		try {
			const roles = [...user?.roles, ROLES.admin];
			const { data } = await axios.put(url, { roles });
			dispatch(updateUserSuccess(data));
			setAlertMsg("Operation successfull");
			setuser(data);
			success = true;
		} catch (error) {
			dispatch(updateUserFailure());
			setAlertMsg(error.message);
			success = false;
		}
	};

	const denyAcccess = async () => {
		const alreadyAdmin = user?.roles?.includes(ROLES.admin);
		const alreadySuper = user?.roles?.includes(ROLES.super);

		if (!alreadyAdmin && !alreadySuper)
			return;
		dispatch(updateUserStart());
		try {
			const roles = [ROLES.user];
			const { data } = await axios.put(url, { roles });
			dispatch(updateUserSuccess(data));
			setAlertMsg("Operation successfull");
			success = true;
		} catch (error) {
			dispatch(updateUserFailure(error));
			setAlertMsg(error.message);
			success = false;
		}
	};

	const removeUser = async () => {
		dispatch(deleteUserStart());
		try {
			const { data } = await axios.delete(url);
			dispatch(deleteUserSuccess(data));
			setAlertMsg("Operation successfull");
			success = true;
		} catch (error) {
			dispatch(deleteUserFailure(error));
			setAlertMsg(error.message);
			success = false;
		}
		back()
	};

	return (
		<div className='overlay w-full h-full fixed' onClick={back}>
			{
				alertMsg && <Alert message={alertMsg} success={success} returnFunction={() => { setAlertMsg(''); back(); }} />
			}
			<div className='p-8 grid shadow-sm w-2/3 h-1/2 bg-white my-auto mx-auto  rounded-xl relative' onClick={(e) => e.stopPropagation()}>
				<div className='flex gap-7 items-center'>
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
				<div className='flex flex-wrap gap-3 items-center justify-center max-h-12'>
					<button onClick={makeSuper} className='min-w-36 h-4/5 rounded-md bg-green-600 text-white whitespace-nowrap '>Make Super</button>
					<button onClick={makeAdmin} className='min-w-36 h-4/5 rounded-md bg-blue-600 text-white whitespace-nowrap '>Make Admin</button>
					<button onClick={denyAcccess} className='min-w-36 h-4/5 rounded-md bg-gray-600 text-white whitespace-nowrap '>Deny Access</button>
					<button onClick={removeUser} className='min-w-36 h-4/5 rounded-md bg-red-600 text-white whitespace-nowrap '>Remove User</button>
				</div>
				<div className='absolute top-8 right-8'>
					<CloseButton onClose={back} />
				</div>

			</div>
		</div >
	);
}

export default User;