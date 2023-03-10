import axios from 'axios';

import configFile from '../config.json';

import store from '../store';

import { signOut } from '../store/slices/authSlice';

import localStorageService from './localStorage.service';
import authService from './auth.service';


const http = axios.create({
	baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
	async function (config) {
		if (config.url.includes('/auth/me') || config.url.includes('/car/add') || config.url.indexOf('/car/edit/') >= 0 || config.url.indexOf('/car/delete/') >= 0) {
			const expiresDate = localStorageService.getExpiresIn();
			const refreshToken = localStorageService.getRefreshToken();
			const isExpired = refreshToken && expiresDate < Date.now();

			if (isExpired) {
				try {
					const response = await authService.refresh();
					localStorageService.setTokens(response.data);
				} catch (e) {
					store.dispatch(signOut());
				}
			}

			const accessToken = localStorageService.getAccessToken();

			if (accessToken) {
				config.headers = {
					...config.headers,
					Authorization: `Bearer ${accessToken}`
				};
			}
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch
};

export default httpService;