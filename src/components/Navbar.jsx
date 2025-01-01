import React from 'react';
import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import { MoreVert, } from '@mui/icons-material';

import { LINK_TO } from '../data/appData';
import useNavbar from '../hooks/useNavbar';
const Navbar = () => {
	const navbarHelperHook = useNavbar();
	const {
		anchorEl, mobAnchorEl, openMobMenu, openUsersMenu, openJobsMenu, openFirmsMenu, openAccMenu,
		handleAnchor, handleLogout, handleMobAnchor, handleNavigate, navBtns
	} = navbarHelperHook;

	const mobileMenu =
		<Menu
			open={openMobMenu}
			anchorEl={mobAnchorEl}
			id='mob-menu'
			MenuListProps={{
				'aria-labelledby': 'more-btn',
			}}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={handleMobAnchor}
		>
			{navBtns.map((item, index) => item.allowed ? (<MenuItem key={index}> {item.btnComp} </MenuItem>) : '')}
		</Menu>;

	const jobsMenu =
		<Menu
			id='jobs-menu'
			MenuListProps={{
				'aria-labelledby': 'jobs-btn',
			}}
			open={openJobsMenu}
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={handleAnchor}
		>
			<MenuItem><Button color='inherit' onClick={() => handleNavigate(LINK_TO.listJobs)}>Jobs List</Button></MenuItem>
			<MenuItem><Button color='inherit' onClick={() => handleNavigate(LINK_TO.addJob)}>Add Job</Button></MenuItem>
		</Menu>;

	const firmsMenu =
		<Menu
			id='firms-menu'
			MenuListProps={{
				'aria-labelledby': 'firms-btn',
			}}
			open={openFirmsMenu}
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={handleAnchor}
		>
			<MenuItem><Button color='inherit' onClick={() => handleNavigate(LINK_TO.listCompanies)}>Companies List</Button></MenuItem>
			<MenuItem><Button color='inherit' onClick={() => handleNavigate(LINK_TO.addCompany)}>Add Company</Button></MenuItem>
		</Menu>;

	const usersMenu =
		<Menu
			id='users-menu'
			MenuListProps={{
				'aria-labelledby': 'users-btn',
			}}
			open={openUsersMenu}
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={handleAnchor}
		>
			<MenuItem><Button color='inherit' onClick={() => handleNavigate(LINK_TO.listUsers)}>Users List</Button></MenuItem>
			<MenuItem><Button color='inherit' onClick={() => handleNavigate(LINK_TO.addUser)}>Add User</Button></MenuItem>
		</Menu>;

	const accountMenu =
		<Menu
			id='account-menu'
			MenuListProps={{
				'aria-labelledby': 'account-btn',
			}}
			open={openAccMenu}
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={handleAnchor}

		>
			<MenuItem><Button color='inherit' id='' onClick={() => handleNavigate(LINK_TO.userProfile)}>Profile</Button></MenuItem>
			<MenuItem><Button color='inherit' id='' onClick={() => handleNavigate(LINK_TO.userProfile)}>Setting</Button></MenuItem>
			<MenuItem><Button color='inherit' onClick={handleLogout}>Logout</Button></MenuItem>
		</Menu>;

	return (
		<AppBar sx={{ position: 'sticky', top: 0 }}>
			<Toolbar sx={{ gap: 2, alignItems: 'center', overflow: 'auto' }}>
				<Avatar sx={{ bgcolor: 'deeppink' }}>J</Avatar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Jobify Job Finder</Typography>
				<Box sx={{ display: { xs: 'none', md: 'block' } }}>
					<Stack direction={'row'} alignItems='center' >
						{navBtns.map(item => item.allowed ? item.btnComp : '')}
					</Stack>
				</Box >
				<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
					<IconButton
						id='more-btn'
						onClick={handleMobAnchor}
						aria-controls={openMobMenu ? "more-menu" : undefined}
						aria-expanded={openMobMenu ? 'true' : undefined}
						aria-haspopup='true'
					> <MoreVert color='' /></IconButton>
				</Box>
				{mobileMenu}
				{jobsMenu}
				{firmsMenu}
				{usersMenu}
				{accountMenu}
			</Toolbar >
		</AppBar >

	);
};

export default Navbar;