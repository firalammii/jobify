import React from 'react';

const Button = ({ label, onClickFunction, type, style }) => {

    const button = {
        minWidth: "150px",
        whiteSpace: "nowrap",
        height: "80%",
        borderRadius: "3px",
        border: "none",
        ...style
    };

    return (
        <button
            className='min-w-40 p-2 whitespace-nowrap rounded-md border-none hover:scale-105'
            style={style}
            type={type || "button"}
            onClick={() => onClickFunction()}
        >
            {label}
        </button>
    );
};

export default Button;