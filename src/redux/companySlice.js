import { createSlice } from '@reduxjs/toolkit';
import { API_STATUS } from '../@api/promiseStatus';
import { fetchCompanies } from '../@api/api/company_api';
import { signOut } from '../@api/api/auth_api';
import { rowsOptions } from '../data/tables';

const initialState = {
	companies: [],
	totalNum: 0,
	totalPages: 0,
	currPage: 1,
	rowsPerPage: rowsOptions[0],
	length: 0,

	error: null,
	status: API_STATUS.idle,
};

const jobSlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		setModal: () => (state, action) => {
			state.modalCompany = action.payload;
		},
		clearModal: () => (state) => {
			state.modalCompany = null;
		},
		clearCompanies: (state) => state = initialState 

	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCompanies.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(fetchCompanies.fulfilled, (state, action) => {
				state.totalNum = action.payload.totalNum;
				state.currPage = action.payload.currPage;
				state.totalPages = action.payload.totalPages;
				state.companies = action.payload.companies;
				state.length = action.payload.length;
				state.rowsPerPage = action.payload.rowsPerPage;

				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(fetchCompanies.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})
			.addCase(signOut.fulfilled, (state, { payload }) => {

				return initialState;
			});
	}
});

export const {
	clearModal,
	setModal,
	clearCompanies,
} = jobSlice.actions;

export const companiesSelector = (state) => state.companies;
export default jobSlice.reducer;
