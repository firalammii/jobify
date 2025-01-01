import { createSlice } from '@reduxjs/toolkit';
import { rowsOptions } from '../data/tables';
import { API_STATUS } from '../@api/promiseStatus';
import { signIn, signOut, updateProfile, deleteProfile, refresh } from '../@api/api/auth_api';

const initialState = {
	currentUser: null,
	error: null,
	status: API_STATUS.idle,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signedIn: (state, { payload }) => {
			state.currentUser = payload;
			state.status = API_STATUS.succeeded;
			state.error = null;
		},
		signedOut: (state, { payload }) => {
			if (payload) {
				state.currentUser = null;
				state.status = API_STATUS.succeeded;
				state.error = null;
			}
		},
		getAccessToken: (state, { payload }) => {
			state.currentUser.accessToken = payload.accessToken;
			state.status = API_STATUS.succeeded;
			state.error = null;
		}
	},
	extraReducers: (builder) => {
		builder
			/***************** Login user *************** */
			.addCase(signIn.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(signIn.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})
			/* **************** Update Profile ************* */
			.addCase(updateProfile.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				const targetIndex = state.users.findIndex(user => user._id === action.payload._id);
				state.users[targetIndex] = action.payload;
				state.currentUser = action.payload;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})
			/* **************** delete Profile ************* */
			.addCase(deleteProfile.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(deleteProfile.fulfilled, (state, action) => {
				state.targetUser = action.payload;
				if (state.targetUser._id === state.currentUser._id)
					state.currentUser = action.payload;
				const targetIndex = state.users.findIndex(user => user._id === action.payload._id);
				state.users[targetIndex] = action.payload;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(deleteProfile.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})
			/***************** Logout user *************** */
			.addCase(signOut.pending, (state) => {
				state.status = API_STATUS.loading;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(signOut.fulfilled, (state, { payload }) => {
				if (payload) {
					state.currentUser = null;
					state.status = API_STATUS.idle;
					state.error = null;
				}
			})
			.addCase(signOut.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})
			/***************** refresh token *************** */
			.addCase(refresh.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(refresh.fulfilled, (state, { payload }) => {
				state.currentUser.accessToken = payload.accessToken;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(refresh.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			});
	}
});

export const currentUserSelector = (state => state.auth.currentUser);
export const authSelector = (state => state.auth);
export const { signedIn, signedOut, getAccessToken } = authSlice.actions;
export default authSlice.reducer;
