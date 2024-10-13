import { createSlice } from '@reduxjs/toolkit';
import { sessionStorageKey } from '../data/roles';

const initialState = {
	users: [],
	currUser: null,
	// currUser: JSON.parse(sessionStorage.getItem(sessionStorageKey)) || null,
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
			sessionStorage.setItem(sessionStorageKey, JSON.stringify(action.payload));
		},
		signInFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		refreshInStart: (state) => {
			state.loading = true;
		},
		refreshInSuccess: (state, action) => {
			state.currUser = { ...state.currUser, accessToken: action.payload };
			state.loading = false;
			state.error = null;
			sessionStorage.setItem(sessionStorageKey, JSON.stringify(action.payload));
		},
		refreshInFailure: (state, action) => {
			// state.error = action.payload;
			// state.loading = false;
			state.currUser = null;
			state.loading = false;
			state.error = null;
			sessionStorage.removeItem(sessionStorageKey);
		},

		updateUserStart: (state) => {
			state.loading = true;
		},
		updateUserSuccess: (state, action) => {
			state.currUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		updateUserFailure: (state, action) => {
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
			sessionStorage.removeItem(sessionStorageKey);
		},
		deleteMeFailure: (state, action) => {
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
			sessionStorage.removeItem(sessionStorageKey);
		},
		signOutUserFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},

		deleteUserStart: (state) => {
			state.loading = true;
		},
		deleteUserSuccess: (state, payload) => {
			state.users = state.users.filter((user) => user._id !== payload._id);
			state.loading = false;
			state.error = null;
		},
		deleteUserFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const {
	signInStart,
	signInSuccess,
	signInFailure,
	refreshInStart,
	refreshInSuccess,
	refreshInFailure,
	updateUserFailure,
	updateUserSuccess,
	updateUserStart,
	deleteMeFailure,
	deleteMeSuccess,
	deleteMeStart,

	deleteUserFailure,
	deleteUserSuccess,
	deleteUserStart,
	signOutUserFailure,
	signOutUserSuccess,
	signOutUserStart,
} = userSlice.actions;

export default userSlice.reducer;
