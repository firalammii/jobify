import { IconButton } from '@mui/material';
import { AddCircleRounded } from '@mui/icons-material';

function AddButton ({ onClick }) {
	return (
		<IconButton
			onClick={onClick}
			size='medium'
			className='w-16 h-16 bg-transparent rounded-full hover:bg-blue-400 absolute bottom-14 left-1/2 z-50 grid place-items-center'
		>
			<AddCircleRounded
				fontSize='large'
				className=' text-slate-600'
				style={{ color: "#deeefa", background: "transparent", borderRadius: "50%" }}
			/>
		</ IconButton>
	);
}

export default AddButton;