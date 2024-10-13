import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import '../css/reg-log.scss';

import { Alert } from '../components';
import axios from '../apis/axios';
import { useDispatch } from "react-redux";
import { roles as userRoles, ROLES } from "../data/roles";

const NAME_REGEX = /^[a-z ]{2,24}$/i;
const TEL_NO_REGEX = /^0(9|7)[0-9]{8}$/i;
const PWD_REGEX = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const Register = () => {

    const inputRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [roles, setRoles] = useState('');
    const [password, setPassword] = useState('');
    const [matchPwd, setMatchPwd] = useState('');

    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPasword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        inputRef.current.focus();
    }, []);
    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
    }, [firstName]);
    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName]);
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd]);
    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, password, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = NAME_REGEX.test(firstName);
        const v2 = NAME_REGEX.test(lastName);
        const v3 = PWD_REGEX.test(password);

        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry is Detected");
            return;
        }
        try {
            const user = { firstName, lastName, password, roles: [ROLES.admin] };
            const response = await axios.post('/users', user);
            console.log(response);
            // dispatch({ type: CREATE_USER, payload: response?.data });
            setSuccess(true);
            setAlertMsg("Registration is Successfull !!");
            clearFields();
        } catch (err) {
            console.log(err);
            setSuccess(false);

            if (!err?.response) {
                setErrMsg('No Server Response');
                setAlertMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
                setAlertMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
                setAlertMsg('Sorry !! Reistration is Failed Try Again Later !');
            }
            errRef.current.focus();
        }
    };
    const clearFields = () => {
        setFirstName(""); setLastName("");
        setPassword(""); setMatchPwd("");
    };

    const togglePwdShow = (id) => {
        const el = document.getElementById(id);
        el.type = el.type === "text" ? "password" : "text";
        if (id === "password")
            setShowPassword(prev => !prev);
        else setShowConfirmPassword(prev => !prev);
    };

    const AreaNote = ({ valueFocus, value, validValue }) => {
        return (
            <p id="name-note" className={valueFocus && value && !validValue ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                should be characters only,
                and 2 - 24 in length.
            </p>
        );
    };

    const EyeComponent = ({ showState, elemId }) => {
        return (
            <div className="eye" onClick={() => togglePwdShow(elemId)} >
                {showState ?
                    <VisibilityOffRounded fontSize="small" />
                    : <VisibilityRounded fontSize="small" />
                }
            </div>
        );
    };

    return (
        <div className="reglog-component" onClick={(e) => e.stopPropagation()}>
            {alertMsg ?
                <Alert
                    returnFunction={() => setAlertMsg("")}
                    success={success}
                    message={alertMsg}
                />
                :
                <div className="reglog-container">

                    {/* <div className="title-con">
                        <p className="title">Add User </p>
                    </div> */}

                    <form onSubmit={handleSubmit} className="form">

                        <div className="form-element">
                            <div className="inputs-n-instruction">
                                <input
                                    className="inputs"
                                    placeholder="FIRST NAME"
                                    type="text"
                                    id="first-name"
                                    ref={inputRef}
                                    autoComplete="off"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    required
                                    aria-invalid={validFirstName ? "false" : "true"}
                                    aria-describedby="name-note"
                                    onFocus={() => setFirstNameFocus(true)}
                                    onBlur={() => setFirstNameFocus(false)}
                                />
                                <AreaNote valueFocus={firstNameFocus} value={firstName} validValue={validFirstName} />
                            </div>
                            <label htmlFor="first-name">
                                <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
                            </label>
                        </div>

                        <div className="form-element">
                            <div className="inputs-n-instruction">
                                <input
                                    className="inputs"
                                    placeholder="LAST NAME"
                                    type="text"
                                    id="last-name"
                                    autoComplete="off"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    required
                                    aria-invalid={validLastName ? "false" : "true"}
                                    aria-describedby="name-note"
                                    onFocus={() => setLastNameFocus(true)}
                                    onBlur={() => setLastNameFocus(false)}
                                />
                                <AreaNote valueFocus={lastNameFocus} value={lastName} validValue={validLastName} />
                            </div>
                            <label htmlFor="last-name">
                                <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                            </label>
                        </div>

                        <div className="form-element">
                            <div className="inputs-n-instruction">
                                <div className="relative">
                                    <EyeComponent showState={showPassword} elemId={"password"} />
                                    <input
                                        className="inputs"
                                        placeholder="CREATE PASSWORD"
                                        type="password"
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required
                                        aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwd-note"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />
                                </div>
                                <p id="pwd-note" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 to 24 characters. must be strong password, mix symbols too
                                </p>
                            </div>
                            <label htmlFor="password">
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                            </label>
                        </div>

                        <div className="form-element">
                            <div className="inputs-n-instruction">
                                <div className="relative">
                                    <EyeComponent showState={showConfirmPasword} elemId={"confirm-pwd"} />
                                    <input
                                        className="inputs"
                                        placeholder="CONFIRM PASSWORD"
                                        type="password"
                                        id="confirm-pwd"
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        value={matchPwd}
                                        required
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirm-note"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
                                </div>
                                <p id="confirm-note" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password.
                                </p>
                            </div>
                            <label htmlFor="confirm-pwd">
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>
                        </div>

                        <div className={errMsg ? 'errmsg' : 'transparent'} ref={errRef}>
                            <p>{errMsg}</p>
                        </div>

                        <div className="form-element">
                            <button
                                className="btn signup-btn"
                                type="submit"
                            >
                                Add User
                            </button>
                        </div>

                    </form>
                </div>}
        </div>
    );
};

export default Register;