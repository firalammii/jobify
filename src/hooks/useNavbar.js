import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { LINK_TO } from '../data/appData';
import { Avatar, Button } from '@mui/material';
import { signOut } from '../@api/api/auth_api';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { clearJobs } from '../redux/jobSlice';
import { clearCompanies } from '../redux/companySlice';
import { clearUsers } from '../redux/userSlice';


const styles = {
	justifyContent: 'start',
	height: 25,
};

const useNavbar = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobAnchorEl, setMobAnchorEl] = useState(null);

	const openMobMenu = Boolean(mobAnchorEl);
	const openJobsMenu = Boolean(anchorEl) && anchorEl.id.startsWith('jobs');
	const openFirmsMenu = Boolean(anchorEl) && anchorEl.id.startsWith('firms');
	const openUsersMenu = Boolean(anchorEl) && anchorEl.id.startsWith('users');
	const openAccMenu = Boolean(anchorEl) && anchorEl.id.startsWith('account');

	const currentUser = useSelector(currentUserSelector);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleAnchor = (e) => {
		if (Boolean(anchorEl))
			setAnchorEl(null);
		else
			setAnchorEl(e.currentTarget);
	};
	const closeAnchor = () => {
		setMobAnchorEl(null);
		setAnchorEl(null);
	};

	const handleMobAnchor = (e) => {
		if (openMobMenu)
			setMobAnchorEl(null);
		else
			setMobAnchorEl(e.currentTarget);
	};

	const handleLogout = (e) => {
		dispatch(signOut());
		// dispatch(clearJobs());
		// dispatch(clearCompanies());
		// dispatch(clearUsers());
		closeAnchor();
	};

	const handleNavigate = (to) => {
		navigate(to);
		closeAnchor();
	};

	const navBtns = [
		{
			allowed: true,
			btnComp: <Button
				color='inherit'
				id='home-btn'
				fullWidth={openMobMenu}
				sx={styles}
				onClick={() => handleNavigate(LINK_TO.home)}
			>
				Home
			</Button>
		},
		{
			allowed: true,
			btnComp: <Button
				color='inherit'
				id='about-btn'
				fullWidth={openMobMenu}
				sx={styles}
				onClick={() => handleNavigate(LINK_TO.about)}
			>
				About
			</Button>
		},
		{
			allowed: !Boolean(currentUser),
			btnComp:
				<Button
					color='inherit'
					id='signin'
					fullWidth={openMobMenu}
					sx={styles}
					onClick={() => handleNavigate(LINK_TO.signIn)}
				>
					Sign in
				</Button>
		},
		{
			allowed: Boolean(currentUser),
			btnComp:
				<Button
					color='inherit'
					id='jobs-btn'
					fullWidth={openMobMenu}
					sx={styles}
					onClick={handleAnchor}
					endIcon={openJobsMenu ? (<KeyboardArrowUp id='jobs-icon-btn-up' />) : (<KeyboardArrowDown id='jobs-icon-btn-down' />)}
				>
					Jobs
				</Button>
		},
		{
			allowed: Boolean(currentUser),
			btnComp:
				<Button
					color='inherit'
					id='firms-btn'
					fullWidth={openMobMenu}
					sx={styles}
					onClick={handleAnchor}
					endIcon={openFirmsMenu ? (<KeyboardArrowUp id='firms-icon-btn-up' />) : (<KeyboardArrowDown id='firms-icon-btn-down' />)}
				>
					Firms
				</Button>
		},
		{
			allowed: Boolean(currentUser),
			btnComp:
				<Button
					color='inherit'
					id='users-btn'
					fullWidth={openMobMenu}
					sx={styles}
					onClick={handleAnchor}
					endIcon={openUsersMenu ? (<KeyboardArrowUp id='users-icon-btn-up' />) : (<KeyboardArrowDown id='users-icon-btn-down' />)}
				>
					Users
				</Button>
		},
		{
			allowed: Boolean(currentUser),
			btnComp:
				<Button
					color='inherit'
					id='account-btn'
					sx={{ gap: 1 }}
					fullWidth={openMobMenu}
					onClick={handleAnchor}
					endIcon={openAccMenu ? (<KeyboardArrowUp id='account-icon-btn-up' />) : (<KeyboardArrowDown id='account-icon-btn-down' />)}
				>
					<Avatar sx={{ width: 20, height: 20 }} src={currentUser?.avatar} />
					<span>Account</span>
				</Button>
		},

	];

	return {
		handleLogout, handleNavigate, navBtns,
		anchorEl, mobAnchorEl, handleAnchor, handleMobAnchor,
		openMobMenu, openUsersMenu, openJobsMenu, openFirmsMenu, openAccMenu,
	};
};

export default useNavbar;