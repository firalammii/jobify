import React from 'react';
import { Edit, DeleteForever, Details } from '@mui/icons-material';
import '../css/floating-buttons.scss';
function FloatingButtons ({ editHandler, deleteHandler }) {
	return (
		<div className='icon-btns'>
			<button className='icon-con'><Details color='secondary' fontSize='large' /></button>
			<button className='icon-con' onClick={editHandler}><Edit color='primary' fontSize='large' /></button>
			<button className='icon-con'><DeleteForever color='error' fontSize='large' /></button>
		</div>
	);
}

export default FloatingButtons;