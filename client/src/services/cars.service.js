import httpService from './http.service';

const carsEndPoint = '/car';

const carsService = {
	fetch: async (params = {}) => {
		const response = await httpService.get(carsEndPoint, {
			params: params
		});

		return response;
	},
	getCarById: async (carId) => {
		const response = await httpService.get(carsEndPoint + '/' + carId);
		return response;
	},
	createCar: async (payload) => {
		const response = await httpService.post(carsEndPoint + '/add', payload);
		return response;
	},
	updateCar: async (carId, payload) => {
		const response = httpService.patch(carsEndPoint + '/edit/' + carId, payload);
		return response;
	},
	deleteCar: async (carId, payload) => {
		const response = httpService.delete(carsEndPoint + '/delete/' + carId);
		return response;
	}
};

export default carsService;