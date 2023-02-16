import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import carsService from '../../services/cars.service';
import sorting from '../../config/sorting.json';

const NAME_SPACE = 'carsList';

export const fetchCarsList = createAsyncThunk(
	`${NAME_SPACE}/fetchCarsList`,
	async function (params, { rejectWithValue }) {
		try {
			const response = await carsService.fetch(params);

			if (!response.status === 200) {
				throw new Error('Server error');
			}

			return await response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const carsListSlice = createSlice({
	name: NAME_SPACE,
	initialState: {
		list: [],
		sort: sorting[0].id,
		loading: true,
		error: null
	},
	reducers: {
		setSort(state, action) {
			state.sort = action.payload.sort;
		}
	},
	extraReducers: {
		[fetchCarsList.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[fetchCarsList.fulfilled]: (state, action) => {
			state.loading = false;
			state.list = action.payload;
		},
		[fetchCarsList.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	}
});

export const getCarsListLoadingSelector = (state) => state.carsList.loading;
export const getCarsListErrorSelector = (state) => state.carsList.error;
export const getCarsListSelector = (state) => state.carsList.list;
export const getCarsListSortSelector = (state) => state.carsList.sort;

export const { setSort } = carsListSlice.actions;

export default carsListSlice.reducer;