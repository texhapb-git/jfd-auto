import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from '../../services/auth.service';
import localStorageService from '../../services/localStorage.service';

import { prepareForDB } from '../../utils/user';
import { generateErrors } from '../../utils/generateErrors';

const NAME_SPACE = 'auth';

export const checkAuthUser = createAsyncThunk(
	`${NAME_SPACE}/checkAuthUser`,
	async function (_, { rejectWithValue, dispatch }) {
		try {
			// dispatch(signOut());

		} catch (error) {

			// dispatch(signOut());

			const { code, message } = error.response.data.error;

			if (code === 400) {
				return rejectWithValue(generateErrors(message));
			} else {
				return rejectWithValue(error.message);
			}
		}

	}
);

export const signInApp = createAsyncThunk(
	`${NAME_SPACE}/signInApp`,
	async function (userInfo, { rejectWithValue, dispatch }) {
		try {
			userInfo = prepareForDB(userInfo);

			const userResponse = await authService.signIn(userInfo);

			if (userResponse.status !== 200) {
				return rejectWithValue('Произошла ошибка на сервере');
			}

			dispatch(signIn(userResponse.data));

		} catch (error) {
			const { code, message } = error.response.data.error;

			if (code === 400) {
				return rejectWithValue(generateErrors(message));
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const signUpApp = createAsyncThunk(
	`${NAME_SPACE}/signUpApp`,
	async function (userInfo, { rejectWithValue, dispatch }) {
		try {
			userInfo = prepareForDB(userInfo);
			const userResponse = await authService.signUp(userInfo);

			if (userResponse.status !== 201) {
				return rejectWithValue('Произошла ошибка на сервере');
			}

			dispatch(signIn(userResponse.data));

		} catch (error) {
			const { code, message } = error.response.data.error;

			if (code === 400) {
				return rejectWithValue(generateErrors(message));
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

const authSlice = createSlice({
	name: NAME_SPACE,
	initialState: {
		isAuth: localStorageService.getUserId() ? true : false,
		authUserId: localStorageService.getUserId(),
		authUserInfo: null,
		authError: null,
		registerError: null,
		checkingAuth: true
	},
	reducers: {
		signIn(state, action) {
			localStorageService.setTokens(action.payload);
			state.isAuth = true;
			state.authUserId = action.payload.userId;
			state.authUserInfo = action.payload.userInfo;
		},
		signOut(state) {
			localStorageService.removeUserData();
			state.isAuth = false;
			state.authUserId = null;
			state.authUserInfo = null;
		}
	},
	extraReducers: {
		[checkAuthUser.pending]: (state, action) => {
			state.checkingAuth = true;
		},
		[checkAuthUser.fulfilled]: (state, action) => {
			state.checkingAuth = false;
		},
		[checkAuthUser.rejected]: (state, action) => {
			state.checkingAuth = false;
		},
		[signInApp.pending]: (state, action) => {
			state.authError = null;
		},
		[signInApp.rejected]: (state, action) => {
			state.authError = action.payload;
		},
		[signUpApp.pending]: (state, action) => {
			state.registerError = null;
		},
		[signUpApp.rejected]: (state, action) => {
			state.registerError = action.payload;
		}

	}
});

export const isAuthSelector = (state) => state.auth.isAuth;
export const authUserIdSelector = (state) => state.auth.authUserId;
export const authUserInfoSelector = (state) => state.auth.authUserInfo;
export const authErrorSelector = (state) => state.auth.authError;
export const registerErrorSelector = (state) => state.auth.registerError;
export const checkingAuthSelector = (state) => state.auth.checkingAuth;

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;