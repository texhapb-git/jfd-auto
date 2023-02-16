import httpService from './http.service';

const usersEndPoint = '/user';

const usersService = {
	fetch: async (params) => {
		const response = await httpService.get(usersEndPoint, {
			params: params
		});
		return response;
	},
	getUserById: async (userId) => {
		const response = await httpService.get(
			usersEndPoint + userId
		);
		return response;
	}
};

export default usersService;