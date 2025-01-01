import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { rowsOptions } from '../data/tables';
import { createJob, deleteJob, fetchJobs, findJob, updateJob, } from '../@api/api/jobs_api';
import { API_STATUS } from '../@api/promiseStatus';
import { signOut } from '../@api/api/auth_api';

const initialState = {
	jobs: [],
	totalNum: 0,
	currPage: 1,
	totalPages: 1,
	rowsPerPage: rowsOptions[0],
	length: 0,
	targetJob: null,
	error: null,
	status: API_STATUS.idle, //'loading, success, failed
	searchQuery: "",
};

export const jobSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {
		statusIdle: (state) => {
			state.status = API_STATUS.idle;
		},
		setTargetJob: (state, action) => {
			state.targetJob = action.payload;
		},
		failedDueError: (state, { payload }) => {
			state.error = payload;
		},
		setSearchQuery: (state, { payload }) => {
			state.searchQuery = payload;
		},
		clearJobs: (state) => state = initialState 
	},
	extraReducers: (builder) =>
		builder
			/* ******************* Fetch Job ************************ */
			.addCase(fetchJobs.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(fetchJobs.fulfilled, (state, action) => {
				const { payload } = action;
				if (payload.axiosError) {
					state.error = payload;
					state.status = API_STATUS.failed;
					return;
				}
				state.jobs = action.payload.jobs;
				state.totalNum = action.payload.totalNum;
				state.currPage = action.payload.currPage;
				state.totalPages = action.payload.totalPages;
				state.rowsPerPage = action.payload.rowsPerPage;
				state.length = action.payload.length;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			// .addCase(fetchJobs.rejected, (state, action) => {
			// 	state.status = API_STATUS.failed;
			// 	state.error = action.payload;
			// })
			/* ******************* find Job ************************ */
			.addCase(findJob.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(findJob.fulfilled, (state, action) => {
				console.log(action.payload);
				state.targetJob = action.payload;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(findJob.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})
			/* ******************* Create Job ************************ */
			.addCase(createJob.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(createJob.fulfilled, (state, action) => {
				state.jobs.push(action.payload);
				state.totalNum = state.totalNum + 1;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(createJob.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})
			/* ******************* Update Job ************************ */
			.addCase(updateJob.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(updateJob.fulfilled, (state, action) => {
				const index = state.jobs.findIndex(job => job._id === action.payload._id);
				state.jobs[index] = action.payload;
				state.targetJob = action.payload;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(updateJob.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})
			/* ******************* Delete Job ********************** */
			.addCase(deleteJob.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(deleteJob.fulfilled, (state, action) => {
				const index = state.jobs.findIndex(job => job._id === action.payload._id);
				state.jobs.splice(index, 1);
				state.totalNum--;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(deleteJob.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})
			.addCase(signOut.fulfilled, (state, { payload }) => {

				return initialState;
			})

});

export const {
	statusIdle,
	setTargetJob,
	failedDueError,
	setSearchQuery,
	clearJobs,
} = jobSlice.actions;
export const jobsSelector = (state => state.jobs);
export default jobSlice.reducer;
