import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../@api/api/auth_api';
import { createUser } from '../@api/api/users_api';
import { LINK_TO } from '../data/appData';

const initial = {
	firstName: {
		focus: false,
		error: false,
		value: '',
	},
	lastName: {
		focus: false,
		error: false,
		value: '',
	},
	email: {
		focus: false,
		error: false,
		value: '',
	},
	role: {
		focus: false,
		error: false,
		value: 'jobSeeker',
	},
	password: {
		focus: false,
		error: false,
		value: '',
	},
	confirmPassword: {
		focus: false,
		error: false,
		value: '',
	},
};

const useForm = () => {
	const [user, setUser] = useState(initial);
	const [showPwd, setShowPwd] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const gotoSignup = () => {
		navigate(LINK_TO.addUser);
	};

	const gotoLogin = () => {
		navigate(LINK_TO.signIn);
	};

	const handleHideNShowPwd = () => {
		setShowPwd(!showPwd);
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: { ...user[name], value: value, focus: true, error: false } });
	};

	const handleFocus = (e) => {
		const name = e.target.name;
		setUser({ ...user, [name]: { ...user[name], focus: true } });
	};

	const handleBlur = (e) => {
		const name = e.target.name;
		setUser({ ...user, [name]: { ...user[name], focus: false } });
	};

	const validate = (login) => {
		let formData;
		if (login) {
			const { email, password, ...rest } = user;
			formData = { email, password };
		} else formData = user;
		const failed = Object.entries(formData).filter(entry => !entry[1].value);
		if (failed.length) {
			let nUser = {};
			Object.entries(formData).forEach(entry => {
				nUser[entry[0]] = (!entry[1].value || entry[1].error) ? { ...entry[1], error: true } : { ...entry[1], error: false };
			});
			setUser(nUser);
			return false;
		};
		return true;
	};

	const handleLogin = () => {
		if (validate(true)) {
			let nUser = {};
			Object.entries(user).forEach(entry => {
				nUser[entry[0]] = entry[1].value;
			});
			dispatch(signIn(nUser));
			setUser(initial);
		}
	};
	const handleSignup = () => {
		if (validate()) {
			let nUser = {};
			Object.entries(user).forEach(entry => {
				nUser[entry[0]] = entry[1].value;
			});
			dispatch(createUser(nUser));
			setUser(initial);
		}
	};

	return {
		user, showPwd, handleHideNShowPwd, gotoLogin, gotoSignup, handleBlur, handleFocus, handleChange, handleLogin, handleSignup
	};
};

export default useForm;