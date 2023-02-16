const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const EXPIRES_IN_KEY = 'expiresIn';
const USER_ID_KEY = 'userId';


export const setTokens = ({ accessToken, refreshToken, expiresIn, userId }) => {
	const expiresDate = new Date().getTime() + expiresIn * 1000;

	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
	localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
	localStorage.setItem(EXPIRES_IN_KEY, expiresDate);
	localStorage.setItem(USER_ID_KEY, userId);
};

export const getAccessToken = () => {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
	return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getExpiresIn = () => {
	return localStorage.getItem(EXPIRES_IN_KEY);
};

export const getUserId = () => {
	return localStorage.getItem(USER_ID_KEY);
};

export const removeUserData = () => {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);
	localStorage.removeItem(EXPIRES_IN_KEY);
	localStorage.removeItem(USER_ID_KEY);

};

const localStorageService = {
	setTokens,
	getAccessToken,
	getUserId,
	getExpiresIn,
	removeUserData,
	getRefreshToken
};

export default localStorageService;