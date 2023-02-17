import bodyTypes from '../carsData/bodyTypes.json';
import colors from '../carsData/colors.json';
import engines from '../carsData/engines.json';
import transmissions from '../carsData/transmissions.json';
import gearTypes from '../carsData/gearTypes.json';

import { randomInt } from './numbers';

export function updateCarValues(car) {
	const updateObj = {};

	if (car?.bodyType) {
		updateObj.bodyType = bodyTypes.find(type => type.id === car.bodyType);
	}

	if (car?.color) {
		updateObj.color = colors.find(color => color.id === car.color);
	}

	if (car?.engine) {
		updateObj.engine = engines.find(engine => engine.id === car.engine);
	}

	if (car?.transmission) {
		updateObj.transmission = transmissions.find(transmission => transmission.id === car.transmission);
	}

	if (car?.gearType) {
		updateObj.gearType = gearTypes.find(gearType => gearType.id === car.gearType);
	}

	return { ...car, ...updateObj };
}

export function prepareForDB(car) {

	for (var key in car) {
		if (car.hasOwnProperty(key)) {
			if (typeof car[key] === 'string') {
				car[key] = car[key].trim();
			}

		}
	}

	const updateObj = {};

	if (car?.year) {
		updateObj.year = Number(car.year);
	}

	if (car?.engineVolume) {
		updateObj.engineVolume = Number(car.engineVolume);
	}

	if (car?.enginePower) {
		updateObj.enginePower = Number(car.enginePower);
	}

	if (car?.mileage) {
		updateObj.mileage = Number(car.mileage);
	}

	if (car?.price) {
		updateObj.price = Number(car.price);
	}

	return { ...car, ...updateObj };
}

export function generatePhotos() {
	const photos = [
		'1.jpeg',
		'2.webp',
		'3.jpg',
		'4.jpg',
		'5.jpg',
		'6.jpg',
		'7.jpg',
		'8.jpg'
	];

	const shuffled = photos.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, randomInt(0, shuffled.length));
}