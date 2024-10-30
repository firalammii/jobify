import React from 'react';
const Button = ({ label, onClick, type, style }) => {
    return (
        <button
            className='w-full h-full p-2 whitespace-nowrap rounded-md border-none hover:scale-105'
            style={style}
            type={type || "button"}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;