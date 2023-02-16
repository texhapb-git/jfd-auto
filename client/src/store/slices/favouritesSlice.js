import { createSlice } from '@reduxjs/toolkit';

const NAME_SPACE = 'favourites';


const favouritesSlice = createSlice({
	name: NAME_SPACE,
	initialState: {
		favs: [],
	},
	reducers: {
		toggleFavourite(state, action) {

		}
	}
});

export const getFavouritesCountSelector = (state) => state.favourites.favs.length || 0;

export const { toggleFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;