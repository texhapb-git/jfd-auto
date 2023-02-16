import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import carsService from '../../services/cars.service';

const NAME_SPACE = 'lastCars';

export const fetchLastCars = createAsyncThunk(
	`${NAME_SPACE}/fetchLastCars`,
	async function (_, { rejectWithValue }) {
		try {
			const params = {
				'limit': 6,
				'sort': 'createdAt',
				'order': 'desc'
			};

			const response = await carsService.fetch(params);

			if (response.status !== 200) {
				return rejectWithValue('Произошла ошибка на сервере');
			}

			return await response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const lastCarsSlice = createSlice({
	name: NAME_SPACE,
	initialState: {
		list: [],
		loading: true,
		error: null
	},
	reducers: {

	},
	extraReducers: {
		[fetchLastCars.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[fetchLastCars.fulfilled]: (state, action) => {
			state.loading = false;
			state.list = action.payload;
		},
		[fetchLastCars.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	}
});

export const getLastCarsLoadingSelector = (state) => state.lastCars.loading;
export const getLastCarsErrorSelector = (state) => state.lastCars.error;
export const getLastCarsSelector = (state) => state.lastCars.list;

// export const {  } = lastCarsSlice.actions;

export default lastCarsSlice.reducer;