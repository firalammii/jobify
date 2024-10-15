import { AddCircleRounded } from '@mui/icons-material';
import React from 'react';

function AddButton ({ onClick }) {
	return (
		<button
			onClick={onClick}
			className='w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-400 absolute bottom-20 left-1/2 z-50 grid place-items-center'
		>
			{/* <div className='w-24 bg-white h-0.5 m-0'></div>;
			<div className='h-24 bg-white w-0.5 m-0'></div> */}
			<AddCircleRounded fontSize='large' className=' text-slate-500' style={{ color: "blue", background: "yellow", borderRadius: "50%" }} />
		</ button>
	);
}

export default AddButton;