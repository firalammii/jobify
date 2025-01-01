import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { URL } from "../urls";

export const fetchCompanies = createAsyncThunk('companies/fetch', async (query, thunkAPI) => {
	try {
		const { data } = await axios.get(URL.companyURL + query);
		return data;

	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const createCompany = createAsyncThunk('companies/create', async (company, thunkAPI) => {
	try {
		const { data } = await axios.post(URL.companyURL, company);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const updateCompany = createAsyncThunk('companies/update', async (company, thunkAPI) => {
	try {
		const { data } = await axios.put(URL.companyURL + '/' + company._id, company);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const deleteCompany = createAsyncThunk('companies/delete', async (id, thunkAPI) => {
	try {
		const { data } = await axios.delete(URL.companyURL + '/' + id);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);
	}
});