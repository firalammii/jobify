import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

const TableTitle = ({ title, totalNum, }) => {

	return (
		<Box py={1}>
			<Paper sx={{ p: 1, position: 'sticky', top: 0, }}>
				<Stack direction={'row'} justifyContent='space-between' overflow={'auto'}>
					<Typography variant='body1' textTransform={'capitalize'} component='h3' >{title ? title : "table title"}</Typography>
					<Typography variant='body2' textTransform={'capitalize'} component='h3'>total: {totalNum} {title.split(' ')[0]}</Typography>
				</Stack>
			</Paper>
		</Box>
	);
};

export default TableTitle;