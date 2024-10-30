import React from 'react';
import { useSelector } from 'react-redux';
import { fetchUsersFailure, fetchUsersStart, fetchUsersSuccess } from '../redux/userSlice';
import { userURL } from '../api/urls';
import { useDispatch } from 'react-redux';
import axios from '../api/axios';

export const useFetchUsers = (page, limit) => {
	const dispatch = useDispatch();
	const fetchUsers = async (page, limit) => {
		dispatch(fetchUsersStart());
		const query = `?page=${page}&limit=${limit}`;
		//search
		try {
			const { data } = await axios.get(userURL + query);
			dispatch(fetchUsersSuccess(data));
		} catch (error) {
			console.error(error);
			dispatch(fetchUsersFailure(error.message || "Error While Fetching Users"));
		}
	};
	return fetchUsers(page, limit);
};
