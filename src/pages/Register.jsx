import React from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid2, IconButton, InputAdornment, Paper, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { API_STATUS } from '../@api/promiseStatus';
import useForm from '../hooks/useForm';

const tfSize = 'small';
const tfVariant = 'outlined';
const btnSize = 'large';
const btnVariant = 'contained';
const pageTitleVariant = 'h3';
const pageTitle = 'Register';

const Register = () => {
	const formHelperHook = useForm();

	const {
		user, showPwd, error, status, handleHideNShowPwd, gotoLogin, handleBlur, handleFocus, handleChange, handleSignup
	} = formHelperHook;

	return (
		<Box display={'flex'} justifyContent={'center'} p={0.5}>
			<Stack py={10} spacing={5} bgcolor={'white'} minWidth={275} maxWidth={700} textAlign={'center'} width={{ xs: "100%" }}>
				<Box>
					<Typography variant={pageTitleVariant}>{pageTitle}</Typography>
					<Typography color='error' mt={2} variant='body2'>{error}</Typography>
				</Box>
				<Grid2 container spacing={3} p={2}>
					<Grid2 size={{ xs: 12, sm: 6 }}>
						<TextField
							label='First Name'
							size={tfSize}
							variant={tfVariant}
							name='firstName'
							value={user.firstName.value}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							error={(user.firstName.focus && !user.firstName.value) || user.firstName.error}
							helperText={!user.firstName.value ? "First Name is Required" : ""}
							fullWidth
							required
						/>
					</Grid2>
					<Grid2 size={{ xs: 12, sm: 6 }}>
						<TextField
							label='Last Name'
							size={tfSize}
							name='lastName'
							value={user.lastName.value}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							error={(user.lastName.focus && !user.lastName.value) || user.lastName.error}
							helperText={!user.lastName.value ? "Last Name is Required" : ""}
							fullWidth
							required
						/>
					</Grid2>
					<Grid2 size={{ xs: 12 }}>
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
							helperText={!user.email.value ? "Email is Required" : ""}
							fullWidth
							required
						/>
					</Grid2>
					<Grid2 width='100%' size={{ xs: 12 }} sx={{
						border: '1px solid lightgrey', borderRadius: 1, px: 1
					}}>
						<FormControl fullWidth variant='contained'>
							<FormLabel id="demo-controlled-radio-buttons-group">{`Register as <${user.role.value}>`}</FormLabel>
							<RadioGroup
								row
								sx={{ justifyContent: { sm: 'space-around' } }}
								aria-labelledby="demo-controlled-radio-buttons-group"
								name="role"
								value={user.role.value}
								onChange={handleChange}
								onFocus={handleFocus}
								onBlur={handleBlur}
								error={(user.role.focus && !user.role.value) || user.role.error}
								helperText={!user.role.value ? "Role Name is Required" : ""}
								required
							>
								<FormControlLabel checked={user.role.value === "jobSeeker"} value="jobSeeker" control={<Radio />} label="Job Seeker" />
								<FormControlLabel checked={user.role.value === "recruiter"} value="recruiter" control={<Radio />} label="Recruiter" />
							</RadioGroup>
						</FormControl>
					</Grid2>
					<Grid2 size={{ xs: 12, sm: 6 }}>
						<TextField
							label='Create Password'
							type={showPwd ? "text" : "password"}
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
					</Grid2>
					<Grid2 size={{ xs: 12, sm: 6 }}>
						<TextField
							label='Confirm Password'
							type={!showPwd ? "text" : "password"}
							size={tfSize}
							variant={tfVariant}
							name='confirmPassword'
							value={user.confirmPassword.value}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							error={(user.confirmPassword.focus && user.confirmPassword.value !== user.password.value) || user.confirmPassword.error}
							helperText={!user.confirmPassword.value || user.confirmPassword.value !== user.password.value ? "Confirming is Required and Should Match the Password" : ""}
							slotProps={{
								input: {
									endAdornment: <InputAdornment>
										<IconButton onClick={handleHideNShowPwd}>
											{!showPwd ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							}}
							fullWidth
							required
						/>
					</Grid2>
					<Box></Box>
					<Grid2 size={{ xs: 12 }} >
						<Button
							variant={btnVariant}
							size={btnSize}
							type='submit'
							onClick={handleSignup}
							fullWidth
						>
							{status === API_STATUS.loading ? "Loading" : "Sign Up"}
						</Button>
					</Grid2>
					<Grid2 size={{ xs: 12 }}>
						<Button
							variant='outlined'
							size={btnSize}
							type='button'
							onClick={gotoLogin}
							fullWidth
						>
							Login
						</Button>
					</Grid2>
				</Grid2>
			</Stack>
		</Box>
	);
};

export default Register;