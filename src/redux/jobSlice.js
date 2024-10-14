import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	jobs: [],
	totalNum: 0,
	currPage: 1,
	length: 0,
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

		fetchJobsSuccess: (state, action) => {
			state.jobs = action.payload.jobs;
			state.totalNum = action.payload.totalNum;
			state.currPage = action.payload.currPage;
			state.totalPages = action.payload.totalPages;
			state.length = action.payload.length;

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
			state.jobs = action.payload;
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
			state.jobs = [...jobs.map(item => item._id === action.payload._id ? action.payload : item)];;
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
			state.jobs = [...jobs.filter(job => job._id !== action.payload._id)];
			state.loading = false;
			state.error = null;
		},
		deleteJobFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
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
} = jobSlice.actions;

export default jobSlice.reducer;
