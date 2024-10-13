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
            className='hover:scale-105'
            style={button}
            type={type || "button"}
            onClick={() => onClickFunction()}
        >
            {label}
        </button>
    );
};

export default Button;