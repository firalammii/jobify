import React from 'react';

function IconButton ({ Icon, onClick }) {
	return (
		<button
			className='text-white w-10 h-10 rounded-full border-none cursor-pointer bg-gray-300 hover:bg-white'
			onClick={onClick}
		>
			{Icon}
		</button>
	);
}

export default IconButton;