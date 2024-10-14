import React, { useEffect, useRef } from 'react';
import { DoneRounded, BlockRounded } from '@mui/icons-material';

const Alert = ({ returnFunction, success, message }) => {
    const btnRef = useRef(null);

    useEffect(() => {
        btnRef.current.focus();
    }, []);

    return (
        <div
            className='shadow-md w-2/3 h-72 m-w-200 rounded-xl p-10 grid place-items-center gap-5 bg-white'
            onClick={(e) => e.stopPropagation()}
        >
            <div className={`h-24 w-24 rounded-full font-bold grid place-items-center text-white ${success ? 'bg-green-600' : 'bg-red-600'}`}>
                {
                    success ?
                        <DoneRounded fontSize='large' />
                        : <BlockRounded fontSize='large' />
                }
            </div>

            <div className='text-slate-500 uppercase text-center'>
                {message}
            </div>

            <button className='bg-blue-600 w-32 p-2 rounded-md text-white font-bold border-none text-center' ref={btnRef} onClick={returnFunction} >{success ? "Ok" : "Back"}</button>

        </div>
    );
};

export default Alert;