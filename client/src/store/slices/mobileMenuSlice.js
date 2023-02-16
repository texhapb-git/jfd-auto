import { createSlice } from '@reduxjs/toolkit';

const NAME_SPACE = 'mobileMenu';

const mobileMenuSlice = createSlice({
	name: NAME_SPACE,
	initialState: {
		isOpen: false
	},
	reducers: {
		toggleOpen(state, action) {
			state.isOpen = !state.isOpen;
		},
	}
});

export const getIsOpenSelector = (state) => state.mobileMenu.isOpen || false;

export const { toggleOpen } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;