import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { URL } from "../urls";

export const signIn = createAsyncThunk('auth/login', async (loginData, thunkAPI) => {
	try {
		const { data } = await axios.post(URL.logInURL, loginData);
		localStorage.setItem('authData', JSON.stringify(data));
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async ({ id, user }, thunkAPI) => {
	try {
		const { data } = await axios.put(`${URL.userURL}/${id}`, JSON.stringify(user));
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const deleteProfile = createAsyncThunk('auth/deleteProfile', async (id, thunkAPI) => {
	try {
		const { data } = await axios.delete(`${URL.userURL}/${id}`);
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const signOut = createAsyncThunk('auth/signout', async (thunkAPI) => {
	try {
		const res = await axios.get(URL.logOutURL);
		localStorage.removeItem('authData');
		if (res.status === 204) {
			return true;
		}
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});


export const refresh = createAsyncThunk('auth/refresh', async (thunkAPI) => {
	try {
		const { data } = await axios(URL.refreshURL);
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

