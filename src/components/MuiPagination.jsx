import { Box, Pagination, Paper, Stack } from '@mui/material';
import React from 'react';

const MuiPagination = ({ totalPages }) => {
	return (
		<Box>
			<Paper>
				<Stack>
					<Pagination count={totalPages} showFirstButton showLastButton />
				</Stack>
			</Paper>
		</Box>
	);
};

export default MuiPagination;