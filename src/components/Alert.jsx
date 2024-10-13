import React, { useEffect, useRef } from 'react';
import { DoneRounded, BlockRounded } from '@mui/icons-material';
import * as colors from '../css/global.scss';

const styles = {
    container: {
        alignSelf: "center",
        maxWidth: "700px",
        width: "70%",
        height: "300px",
        borderRadius: "10px",
        padding: "40px",
        display: "grid",
        placeItems: "center",
        gap: "20px",
        backgroundColor: colors.awwssseWhite,
    },
    circle: {
        height: "100px",
        width: "100px",
        borderRadius: "50%",
        fontWeight: 700,
        display: "grid",
        placeItems: "center",
        color: colors.awwssseWhite,
    },
    body: {
        color: colors.awwssseBlue,
        fontWeight: 500,
        fontSize: "14px",
        textTransform: "uppercase",
        textAlign: "center",
    },
    okBtn: {
        backgroundColor: colors.awwssseBlue,
        width: "130px",
        padding: "8px",
        borderRadius: "5px",
        color: "white",
        fontWeight: 700,
        textAlign: "center",
        border: "none",
    }
};

const Alert = ({ returnFunction, success, message }) => {

    const btnRef = useRef(null);
    useEffect(() => {
        btnRef.current.focus();
    }, []);
    return (
        <div
            className="shadow"
            style={styles.container}
            onClick={(e) => e.stopPropagation()}
        >
            <div style={{ ...styles.circle, backgroundColor: success ? colors.awwssseGreen : colors.awwssseRed }}>
                {
                    success ?
                        <DoneRounded fontSize='large' />
                        : <BlockRounded fontSize='large' />
                }
            </div>

            <div style={styles.body}>
                {message}
            </div>

            <button ref={btnRef} style={styles.okBtn} onClick={returnFunction} >{success ? "Ok" : "Back"}</button>

        </div>
    );
};

export default Alert;