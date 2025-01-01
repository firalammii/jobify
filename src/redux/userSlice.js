import { createSlice } from '@reduxjs/toolkit';
import { rowsOptions } from '../data/tables';
import { API_STATUS } from '../@api/promiseStatus';
import { createUser, fetchUsers, updateUser, deleteUser } from '../@api/api/users_api';
import { signOut } from '../@api/api/auth_api';

const initialState = {
	users: [],
	totalNum: 0,
	currPage: 1,
	length: 0,
	totalPages: 1,
	rowsPerPage: rowsOptions[0],

	targetUser: null,
	error: null,
	status: API_STATUS.idle,
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setTargetUser: (state, action) => {
			state.targetUser = action.payload;
		},
		clearUsers: (state) => state = initialState 
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.users = action.payload.users;
				state.totalNum = action.payload.totalNum;
				state.totalPages = action.payload.totalPages;
				state.currPage = action.payload.currPage;
				state.length = action.payload.length;
				state.rowsPerPage = action.payload.rowsPerPage;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})
			/* **************** Create User ************* */
			.addCase(createUser.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.users.push(action.payload);
				state.totalNum++;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(createUser.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})

			/* **************** Update User ************* */
			.addCase(updateUser.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.targetUser = action.payload;
				if (state.targetUser._id === state.currUser._id)
					state.currUser = action.payload;
				const targetIndex = state.users.findIndex(user => user._id === action.payload._id);
				state.users[targetIndex] = action.payload;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})

			/* **************** delete User ************* */
			.addCase(deleteUser.pending, (state) => {
				state.status = API_STATUS.loading;
				state.error = null;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.targetUser = action.payload;
				if (state.targetUser._id === state.currUser._id)
					state.currUser = action.payload;
				const targetIndex = state.users.findIndex(user => user._id === action.payload._id);
				state.users[targetIndex] = action.payload;
				state.status = API_STATUS.succeeded;
				state.error = null;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.status = API_STATUS.failed;
				state.error = action.payload;
			})
			.addCase(signOut.fulfilled, (state, { payload }) => {
				return initialState;
			});

	}
});

export const {

	setTargetUser, clearUsers,

} = userSlice.actions;
export const usersSelector = (state => state.users);
export default userSlice.reducer;
