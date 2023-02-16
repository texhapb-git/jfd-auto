import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import carsService from '../../services/cars.service';
import { prepareForDB } from '../../utils/car';

const NAME_SPACE = 'personalCars';

export const fetchPersonalCarsList = createAsyncThunk(
	`${NAME_SPACE}/fetchPersonalCarsList`,
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

export const deletePersonalCar = createAsyncThunk(
	`${NAME_SPACE}/deletePersonalCar`,
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await carsService.deleteCar(id);

			if (!response.status === 200) {
				throw new Error('Server error');
			}

			dispatch(removeCar({ id }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const createPersonalCar = createAsyncThunk(
	`${NAME_SPACE}/createPersonalCar`,
	async function (data, { rejectWithValue, dispatch }) {
		try {
			const response = await carsService.createCar(prepareForDB(data));

			if (!response.status === 200) {
				throw new Error('Server error');
			}

			const car = response.data;

			dispatch(createCar(car));

			return car;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updatePersonalCar = createAsyncThunk(
	`${NAME_SPACE}/updatePersonalCar`,
	async function ({ id, data }, { rejectWithValue, dispatch }) {
		try {
			const response = await carsService.updateCar(id, prepareForDB(data));

			if (!response.status === 200) {
				throw new Error('Server error');
			}

			const car = response.data;

			dispatch(updateCar(car));

			return car;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const personalCarsListSlice = createSlice({
	name: NAME_SPACE,
	initialState: {
		list: [],
		loading: true,
		error: null
	},
	reducers: {
		clearList(state, action) {
			state.list = [];
			state.loading = true;
			state.error = null;
		},
		createCar(state, action) {
			state.list.unshift(action.payload);
		},
		updateCar(state, action) {
			state.list = state.list.map(car => {
				if (car.id === action.payload.id) {
					return { ...car, ...action.payload };
				}

				return car;
			});

		},
		removeCar(state, action) {
			state.list = state.list.filter(car => car.id !== action.payload.id);
		},
	},
	extraReducers: {
		[fetchPersonalCarsList.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[fetchPersonalCarsList.fulfilled]: (state, action) => {
			state.loading = false;
			state.list = action.payload;
		},
		[fetchPersonalCarsList.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[deletePersonalCar.pending]: (state) => {
			state.error = null;
		},
		[deletePersonalCar.rejected]: (state, action) => {
			state.error = action.payload;
		},
	}
});

export const getPersonalCarsListLoadingSelector = (state) => state.personalCars.loading;
export const getPersonalCarsListErrorSelector = (state) => state.personalCars.error;
export const getPersonalCarsListSelector = (state) => state.personalCars.list;

export const { clearList, removeCar, createCar, updateCar } = personalCarsListSlice.actions;

export default personalCarsListSlice.reducer;