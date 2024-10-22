import { CloseRounded } from '@mui/icons-material';
import React from 'react';

function CloseButton ({ onClose }) {
	return (
		<button onClick={onClose} className='text-slate-500 hover:bg-white w-7 h-7 bg-red-300 rounded-full ' >
			<CloseRounded fontSize='medium' />
		</button>
	);
}

export default CloseButton;