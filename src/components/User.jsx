import React from 'react';
import { CloseRounded } from '@mui/icons-material';

import Button from './Button';

import '../css/overlay.scss';
import { ROLES, roles } from '../data/roles';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { deleteUserFailure, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/userSlice';


const User = ({ user, onClose }) => {

	const url = `/api/users/${user?._id}`;
	const dispatch = useDispatch();
	const axios = useAxiosPrivate();

	const { currUser, users } = useSelector(state => state.user);

	const makeSuper = async () => {
		const alreadySuper = user?.roles?.includes(ROLES.super);
		if (alreadySuper)
			return;
		dispatch(updateUserStart());
		try {
			const roles = [...user?.roles, ROLES.super];
			const { data } = await axios.put(url, { roles });
			console.log(response);
			dispatch(updateUserSuccess(data));

		} catch (error) {
			console.log(error);
			dispatch(updateUserFailure());
		}
		onClose();
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
			console.log(response);
			dispatch(updateUserSuccess(data));

		} catch (error) {
			console.log(error);
			dispatch(updateUserFailure());
		}
		onClose();
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
			console.log(response);
			dispatch(updateUserSuccess(data));
		} catch (error) {
			console.log(error);
			dispatch(updateUserFailure());
		}
		onClose()
	};
	const removeUser = async () => {
		dispatch(deleteUserInStart());
		try {
			const { data } = await axios.delete(url);
			dispatch(deleteUserSuccess(data));
		} catch (error) {
			console.log(error);
			dispatch(deleteUserFailure());

		}
		onClose();
	};

	const buttons = [
		{ id: 1, label: "Make Super", style: { backgroundColor: 'green', color: 'white' }, onClickFunction: () => makeSuper(), },
		{ id: 2, label: "Make Admin", style: { backgroundColor: 'blue', color: 'white' }, onClickFunction: makeAdmin, },
		{ id: 3, label: "Deny Access", style: { backgroundColor: 'gray', color: 'white' }, onClickFunction: denyAcccess, },
		{ id: 4, label: "Remove User", style: { backgroundColor: 'red', color: 'white' }, onClickFunction: removeUser, },
	]

	return (
		<div className='overlay w-full h-full fixed -z-10' onClick={onClose}>
			<div className='p-8 grid shadow-sm w-2/3 h-1/2 bg-white my-auto mx-auto  rounded-xl relative' onClick={e => e.stopPropagation()}>
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
					{/* {
						buttons.map(btn => (<Button key={btn.label} type={btn.type} label={btn.label} style={btn.style} onClick={() => btn.onClickFunction()} />))
					} */}
					<button onClick={makeSuper} className='min-w-36 h-4/5 rounded-md bg-green-600 text-white whitespace-nowrap '>Make Super</button>
					<button onClick={makeAdmin} className='min-w-36 h-4/5 rounded-md bg-blue-600 text-white whitespace-nowrap '>Make Admin</button>
					<button onClick={denyAcccess} className='min-w-36 h-4/5 rounded-md bg-gray-600 text-white whitespace-nowrap '>Deny Access</button>
					<button onClick={removeUser} className='min-w-36 h-4/5 rounded-md bg-red-600 text-white whitespace-nowrap '>Remove User</button>


				</div>
				<button onClick={onClose} className='text-slate-500 bg-white hover:bg-red-300 hover:text-white rounded-full absolute top-8 right-8' >
					<CloseRounded fontSize='medium' />
				</button>
			</div>
		</div >
	);
}

export default User;