import { createSlice } from '@reduxjs/toolkit';
import { rowsOptions } from '../data/tableHeads';

const initialState = {
	users: [],
	totalNum: 0,
	currPage: 1,
	length: 0,
	totalPages: 1,
	rowsPerPage: rowsOptions[0],

	currUser: null,
	error: null,
	loading: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signInStart: (state) => {
			state.loading = true;
		},
		signInSuccess: (state, action) => {
			state.currUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		signInFailure: (state, action) => {
			state.currUser = null;
			state.error = action.payload;
			state.loading = false;
		},

		signOutUserStart: (state) => {
			state.loading = true;
		},
		signOutUserSuccess: (state) => {
			state.currUser = null;
			state.loading = false;
			state.error = null;
		},
		signOutUserFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		fetchUsersStart: (state) => {
			state.loading = true;
		},
		fetchUsersSuccess: (state, action) => {
			state.users = action.payload.users,
				state.totalNum = action.payload.totalNum,
				state.totalPages = action.payload.totalPages,
				state.currPage = action.payload.currPage,
				state.length = action.payload.length,
				state.rowsPerPage = action.payload.rowsPerPage,

				state.loading = false;
			state.error = null;
		},
		fetchUsersFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		updateUserStart: (state) => {
			state.loading = true;
		},
		updateUserSuccess: (state, action) => {
			state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user);
			state.loading = false;
			state.error = null;
		},
		updateUserFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		deleteUserStart: (state) => {
			state.loading = true;
		},
		deleteUserSuccess: (state, action) => {
			state.users = state.users.filter((user) => user._id !== action.payload._id);
			state.totalNum = state.totalNum - 1;
			state.loading = false;
			state.error = null;
		},
		deleteUserFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		createUserStart: (state) => {
			state.loading = true;
		},
		createUserSuccess: (state, action) => {
			state.users = [...state.users, action.payload];
			state.totalNum = state.totalNum + 1;
			state.loading = false;
			state.error = null;
		},
		createUserFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		refreshStart: (state) => {
			state.loading = true;
		},
		refreshSuccess: (state, action) => {
			state.currUser = { ...state.currUser, accessToken: action.payload };
			state.loading = false;
			state.error = null;
		},
		refreshFailure: (state, action) => {
			state.currUser = null;
			state.loading = false;
			state.error = null;
		},

		updateMeStart: (state) => {
			state.loading = true;
		},
		updateMeSuccess: (state, action) => {
			state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user);
			state.currUser = { ...state.currUser, ...action.payload };
			state.loading = false;
			state.error = null;
		},
		updateMeFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		deleteMeStart: (state) => {
			state.loading = true;
		},
		deleteMeSuccess: (state) => {
			state.currUser = null;
			state.loading = false;
			state.error = null;
		},
		deleteMeFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

	},
});

export const {
	signInStart,
	signInSuccess,
	signInFailure,

	signOutUserStart,
	signOutUserSuccess,
	signOutUserFailure,

	fetchUsersStart,
	fetchUsersSuccess,
	fetchUsersFailure,

	updateUserStart,
	updateUserSuccess,
	updateUserFailure,

	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,

	createUserStart,
	createUserSuccess,
	createUserFailure,


	refreshStart,
	refreshSuccess,
	refreshFailure,

	updateMeStart,
	updateMeSuccess,
	updateMeFailure,

	deleteMeStart,
	deleteMeSuccess,
	deleteMeFailure,

} = userSlice.actions;

export default userSlice.reducer;
