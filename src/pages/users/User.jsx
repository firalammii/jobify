import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ROLES } from '../../data/roles';
import { Alert } from '../../components';
import { LINK_TO } from '../../data/appData';
import { deleteUser, updateUser } from '../../@api/api/users_api';
import { usersSelector } from '../../redux/userSlice';
import { currentUserSelector } from '../../redux/authSlice';
import { Avatar, Box, Button, Grid2, Paper, Stack, Typography } from '@mui/material';

const initial = { visible: false, success: false, message: "" };

const User = () => {

	const [alert, setAlert] = useState(initial);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { targetUser: user } = useSelector(usersSelector);
	const { currentUser } = useSelector(currentUserSelector);
	const isCurrUser = user?._id === currentUser?._id;

	useEffect(() => {
		if (!!isCurrUser)
			navigate(LINK_TO.userProfile);
		// if (state) {
		// 	setUser(state);
		// }
	}, []);

	const closeAlert = () => setAlert({ ...alert, visible: false });

	const alterRoles = async (role) => {
		try {
			dispatch(updateUser({ id: user._id, user: role ? { role } : { roles: [ROLES.user] } }));
			const successMsg = role ? `Made ${role === ROLES.admin ? 'An' : 'A'} ${role} User, Operation is successful !!` : 'Removing All User Roles Operation is successful';
			setAlert({ visible: true, success: true, message: successMsg });
		} catch (error) {
			const msg = error.response?.data?.message;
			setAlert({ visible: true, success: false, message: msg ? msg : error.message });
		}
	};

	const removeUser = async () => {
		try {
			dispatch(deleteUser());
			const removalSuccessMsg = "Deleting User Operation is successful";
			setAlert({ visible: true, success: true, message: removalSuccessMsg });
		} catch (error) {
			console.error(error);
			const msg = error.response?.data?.message;
			setAlert({ visible: true, success: false, message: msg ? msg : error.message });
		}
	};

	const btns = [
		{ label: 'Make Super', color: 'primary', onClick: () => alterRoles(ROLES.super) },
		{ label: 'Make Admin', color: 'primary', onClick: () => alterRoles(ROLES.admin) },
		{ label: 'Deny Access', color: 'warning', onClick: () => alterRoles() },
		{ label: 'Remove User', color: 'error', onClick: removeUser },
	];

	const renderBtns = btns.map(({ label, color, onClick, }) => (
		<Grid2 key={label} minWidth='130px' size={{ xs: 6, md: 3 }}>
			<Button
				disabled={isCurrUser}
				onClick={onClick}
				color={color}
				variant='contained'
				fullWidth
			>
				{label}
			</Button>
		</Grid2>
	));

	if (alert.visible)
		return <Alert message={alert.message} success={alert.success} returnFunction={closeAlert} />;

	return (
		<Paper sx={{ p: 5, m: { md: 10 }, my: { xs: 10 } }}>
			<Stack spacing={3} p={5} m='auto' width={{ xs: '90%', md: '80%', lg: '50%' }} position='relative' >
				<Stack>
					<Avatar src={user?.avatar} sx={{ width: 100, height: 100 }} />
					<Box >
						<Typography variant='h6' className='font-bold'>{user?.firstName} {user?.lastName}</Typography>
						<Typography >{user?.email} </Typography>
						<Typography variant='body2'>{user?.roles.join(', ')} </Typography>
					</Box>
				</Stack>

				<Grid2 container spacing={1} className='flex flex-wrap  gap-5 justify-center items-center max-h-12'>
					{renderBtns}
				</Grid2>
				<Box>
					<Typography variant='h6' color={alert.success ? 'success' : 'error'}>{alert.message}</Typography>
				</Box>
			</Stack>
		</Paper>
	);
};

export default User;