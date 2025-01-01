import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, useMediaQuery } from '@mui/material';

import Navbar from './Navbar';

const Layout = () => {

	const nonMobileScreen = useMediaQuery("(min-width: 700px)");

	const mainContent =
		nonMobileScreen
			? <main className='fullscreen flex-col'>
				<Outlet />
			</main>
			: <Container sx={{ height: '100%' }}>
				<main className='fullscreen flex-col'>
					<Outlet />
				</main>
			</Container>;

	return (
		<Box height='calc(100% - 68px)'>
			<Navbar />
			{mainContent}
		</Box>
	);
};

export default Layout;