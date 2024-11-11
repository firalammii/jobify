import { createSlice } from '@reduxjs/toolkit';
import { rowsOptions } from '../data/tableHeads';

const initialState = {
	jobs: [],
	totalNum: 0,
	currPage: 1,
	length: 0,
	rowsPerPage: rowsOptions[0],
	totalPages: 1,
	error: null,
	loading: false,
};

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		fetchJobsStart: (state) => {
			state.loading = true;
		},
		// fetchJobsStart(state) {
		// 	state.loading = true;
		// },
		fetchJobsSuccess: (state, action) => {
			state.jobs = action.payload.jobs;
			state.totalNum = action.payload.totalNum;
			state.currPage = action.payload.currPage;
			state.totalPages = action.payload.totalPages;
			state.length = action.payload.length;
			state.rowsPerPage = action.payload.rowsPerPage;

			state.loading = false;
			state.error = null;
		},

		fetchJobsFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		createJobStart: (state) => {
			state.loading = true;
		},
		createJobSuccess: (state, action) => {
			state.jobs = [action.payload, ...state.jobs];
			state.totalNum = state.totalNum + 1;
			state.loading = false;
			state.error = null;
		},
		createJobFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		updateJobStart: (state) => {
			state.loading = true;
		},
		updateJobSuccess: (state, action) => {
			state.jobs = [...state.jobs.map(item => item._id === action.payload._id ? action.payload : item)];;
			state.loading = false;
			state.error = null;
		},
		updateJobFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		deleteJobStart: (state) => {
			state.loading = true;
		},
		deleteJobSuccess: (state, action) => {
			state.jobs = [...state.jobs.filter(job => job._id !== action.payload._id)];
			state.totalNum = state.totalNum - 1;
			state.loading = false;
			state.error = null;
		},
		deleteJobFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		pageChange: (state, action) => {
			state.currPage = state.currPage + action.payload;
		},
		rowsPerPageChange: (state, action) => {
			state.currPage = 1;
			state.rowsPerPage = action.payload;
		},

	},
});

export const {
	fetchJobsStart,
	fetchJobsSuccess,
	fetchJobsFailure,
	createJobFailure,
	createJobSuccess,
	createJobStart,
	updateJobFailure,
	updateJobSuccess,
	updateJobStart,
	deleteJobFailure,
	deleteJobSuccess,
	deleteJobStart,
	pageChange,
	rowsPerPageChange
} = jobSlice.actions;

export default jobSlice.reducer;
