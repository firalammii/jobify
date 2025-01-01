import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "../axios";
import { URL } from "../urls";


export const fetchUsers = createAsyncThunk('users/fetch', async (incomingQuery, thunkAPI) => {
	//search
	const query = incomingQuery ? incomingQuery : "";
	try {
		const { data } = await axios.get(URL.userURL + query);
		return data;

	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const createUser = createAsyncThunk('users/create', async (user, thunkAPI) => {
	try {
		const { data } = await axios.post(URL.userURL, JSON.stringify(user));
		return data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }, thunkAPI) => {
	try {
		const { data } = await axios.put(`${URL.userURL}/${id}`, JSON.stringify(user));
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id, thunkAPI) => {
	try {
		const { data } = await axios.delete(`${URL.userURL}/${id}`);
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	}
});

