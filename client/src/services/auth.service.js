import httpService from './http.service';

import localStorageService from './localStorage.service';

const authEndPoint = '/auth';


const authService = {
	signUp: async (payload) => {
		const response = await httpService.post(authEndPoint + '/signUp', payload);
		return response;
	},
	signIn: async (payload) => {
		const response = await httpService.post(authEndPoint + '/signInWithPassword', payload);
		return response;
	},
	refresh: async () => {
		const response = await httpService.post(authEndPoint + '/token', {
			refreshToken: localStorageService.getRefreshToken()
		});
		return response;

	}
};

export default authService;