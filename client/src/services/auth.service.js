import axios from 'axios';

import configFile from '../config.json';

import localStorageService from './localStorage.service';

const httpAuth = axios.create({
	baseURL: configFile.apiEndpoint + '/auth',
});


const authService = {
	signUp: async (payload) => {
		const response = await httpAuth.post('/signUp', payload);
		return response;
	},
	signIn: async (payload) => {
		const response = await httpAuth.post('/signInWithPassword', payload);
		return response;
	},
	refresh: async () => {
		const response = await httpAuth.post('/token', {
			refreshToken: localStorageService.getRefreshToken()
		});
		return response;

	}
};

export default authService;