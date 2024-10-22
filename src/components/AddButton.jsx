import { AddCircleRounded } from '@mui/icons-material';
import React from 'react';

function AddButton ({ onClick }) {
	return (
		<button
			onClick={onClick}
			className='w-16 h-16 bg-transparent rounded-full hover:bg-blue-400 absolute bottom-14 left-1/2 z-50 grid place-items-center'
		>
			<AddCircleRounded
				fontSize='large'
				className=' text-slate-600'
				style={{ color: "#deeefa", background: "transparent", borderRadius: "50%" }}
			/>
		</ button>
	);
}

export default AddButton;