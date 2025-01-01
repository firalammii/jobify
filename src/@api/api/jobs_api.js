import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';
import { URL } from '../urls';

const url = URL.jobURL;

export const fetchJobs = createAsyncThunk('jobs/fetch', async (incomingQuery, thunkAPI) => {
	const query = incomingQuery ? incomingQuery : "";
	try {
		const { data } = await axios.get(url + query);
		return data;
	} catch (error) {
		// console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const findJob = createAsyncThunk('jobs/find', async (id, thunkAPI) => {
	try {
		const { data } = await axios.get(url + '/' + id);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const createJob = createAsyncThunk('jobs/create', async (formData, thunkAPI) => {
	try {
		const { data } = await axios.post(url, formData);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const updateJob = createAsyncThunk('jobs/update', async (job, thunkAPI) => {
	const { _id } = job;
	try {
		const { data } = await axios.put(url + '/' + _id, job);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const deleteJob = createAsyncThunk('jobs/delete', async ({ id, accessToken }, thunkAPI) => {
	try {
		const { data } = await axios.delete(url + '/' + id);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});
