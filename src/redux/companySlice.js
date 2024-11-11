import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	companies: [],
	totalNum: 0,
	currPage: 1,
	rowsPerPage: 10,
	totalPages: 0,
	length: 0,
	modalCompany: null,



	error: null,
	loading: false,
};

const jobSlice = createSlice({
	name: 'company',
	initialState,
	reducers: {
		fetchCompaniesStart: (state) => {
			state.loading = true;
		},
		fetchCompaniesSuccess: (state, action) => {
			state.totalNum = action.payload.totalNum;
			state.currPage = action.payload.currPage;
			state.totalPages = action.payload.totalPages;
			state.companies = action.payload.companies;
			state.length = action.payload.length;
			state.rowsPerPage = action.payload.rowsPerPage;

			state.loading = false;
			state.error = null;
		},
		fetchCompaniesFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		createCompanyStart: (state) => {
			state.loading = true;
		},
		createCompanySuccess: (state, action) => {
			state.companies = [...state.companies, action.payload];
			state.totalNum = state.totalNum + 1;
			state.loading = false;
			state.error = null;
		},
		createCompanyFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		updateCompanyStart: (state) => {
			state.loading = true;
		},
		updateCompanySuccess: (state, action) => {
			state.companies = [...companies.map(item => item._id === action.payload._id ? action.payload : item)];
			state.loading = false;
			state.error = null;
		},
		updateCompanyFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		deleteCompanyStart: (state) => {
			state.loading = true;
		},
		deleteCompanySuccess: (state, action) => {
			state.companies = [...state.companies.filter(item => item._id !== action.payload._id)];
			state.totalNum = state.totalNum - 1;
			state.loading = false;
			state.error = null;
		},
		deleteCompanyFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		setModal: () => (state, action) => {
			state.modalCompany = action.payload;
		},
		clearModal: () => (state) => {
			state.modalCompany = null;
		},

	},
});

export const {
	fetchCompaniesStart,
	fetchCompaniesSuccess,
	fetchCompaniesFailure,
	createCompanyFailure,
	createCompanySuccess,
	createCompanyStart,
	updateCompanyFailure,
	updateCompanySuccess,
	updateCompanyStart,
	deleteCompanyFailure,
	deleteCompanySuccess,
	deleteCompanyStart,
	clearModal,
	setModal
} = jobSlice.actions;

export default jobSlice.reducer;
