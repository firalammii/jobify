import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { API_STATUS } from '../@api/promiseStatus';
import useLogin from '../hooks/useForm';
import { authSelector } from '../redux/authSlice';
import { LINK_TO } from '../data/appData';

const tfSize = 'small';
const tfVariant = 'outlined';
const btnSize = 'large';
const btnVariant = 'contained';
const pageTitleVariant = 'h3';
const pageTitle = 'Login';

const Login = () => {

	const formHelperHook = useLogin();
	const {
		user, showPwd, handleHideNShowPwd, gotoSignup, handleBlur, handleFocus, handleChange, handleLogin
	} = formHelperHook;

	const navigate = useNavigate();
	const location = useLocation();

	const { currentUser, status, error } = useSelector(authSelector);

	const pathname = location.state?.from?.pathname;
	const from = pathname ? pathname : LINK_TO.home;

	useEffect(() => {
		if (currentUser) {
			navigate(from, { replace: true });
		}
	}, [status]);

	return (
		<Box display={'flex'} justifyContent={'center'} height={'100%'} p={0.5} >
			<Stack spacing={6} p={4} bgcolor={'white'} width={{ xs: "100%" }} minWidth={275} maxWidth={500} textAlign={'center'} >
				<Box>
					<Typography variant={pageTitleVariant}>{pageTitle}</Typography>
					<Typography color='error' mt={2} variant='body2'>{error}</Typography>
				</Box>
				<Stack spacing={3}>
					<TextField
						label='Email'
						size={tfSize}
						variant={tfVariant}
						name='email'
						value={user.email.value}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						error={(user.email.focus && !user.email.value) || user.email.error}
						helperText={!user.email.value ? "Email Name is Required" : ""}
						fullWidth
						required
					/>
					<TextField
						label='Password'
						type={showPwd ? 'text' : 'password'}
						size={tfSize}
						variant={tfVariant}
						name='password'
						value={user.password.value}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						error={(user.password.focus && !user.password.value) || user.password.error}
						helperText={!user.password.value ? "Password is Required" : ""}
						slotProps={{
							input: {
								endAdornment: <InputAdornment>
									<IconButton onClick={handleHideNShowPwd}>
										{showPwd ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						}}
						fullWidth
						required
					/>
				</Stack>
				<Stack spacing={3}>
					<Button
						variant={btnVariant}
						size={btnSize}
						type='submit'
						onClick={handleLogin}
						fullWidth
					>
						{status === API_STATUS.loading ? "Loading" : "Login"}
					</Button>
					<Button
						variant='outlined'
						size={btnSize}
						type='button'
						onClick={gotoSignup}
						fullWidth
					>
						Sign Up
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Login;