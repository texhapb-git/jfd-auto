const express = require('express');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth.middleware');
const { carDataPrepare } = require('../middleware/data.middleware');

const Car = require('../models/Car');
const User = require('../models/User');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {

		const limit = req?.query?.limit || 30;

		const sort = req?.query?.sort || 'createdAt';
		const order = req?.query?.order || 'desc';

		const filter = {};

		if (req?.query?.userId) {
			filter.userId = req.query.userId;
		}

		const cars = await Car.find(filter, { createdAt: 0, updatedAt: 0 }).sort({ [sort]: [order] }).limit(limit);

		if (!cars) {
			return res.status(400).json({
				error: {
					message: "SERVER_ERROR",
					code: 400
				}
			});
		}

		res.status(200).send(cars);
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже.'
		});
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const car = await Car.findById(id, { createdAt: 0, updatedAt: 0 });

		if (!car) {
			return res.status(400).json({
				error: {
					message: "SERVER_ERROR",
					code: 400
				}
			});
		}

		const userId = car.userId;

		const user = await User.findById(userId, { _id: 0, firstName: 1, lastName: 1, email: 1, phone: 1 });

		if (!user) {
			return res.status(400).json({
				error: {
					message: "SERVER_ERROR",
					code: 400
				}
			});
		}

		const resultCar = {
			...car._doc,
			userInfo: user
		}

		res.status(200).send(resultCar);
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже.'
		});
	}
});


router.post('/add', [
	auth,
	carDataPrepare,
	check('title', 'Некорректный заголовок').exists({ checkFalsy: true }),
	check('year', 'Некорректный год').exists({ checkFalsy: true }).custom(value => {
		val = parseInt(value) || 0;
		const dateNow = new Date();
		return value >= 1900 && value <= parseInt(dateNow.getFullYear());
	}).custom(value => !isNaN(value)),
	check('bodyType', 'Некорректный тип кузова').exists({ checkFalsy: true }),
	check('engine', 'Некорректный тип двигателя').exists({ checkFalsy: true }),
	check('engineVolume', 'Некорректный объем двигателя').exists({ checkFalsy: true }).custom(value => !isNaN(value)),
	check('enginePower', 'Некорректная мощность').exists({ checkFalsy: true }).custom(value => !isNaN(value)),
	check('gearType', 'Некорректный тип привода').exists({ checkFalsy: true }),
	check('transmission', 'Некорректный тип коробки').exists({ checkFalsy: true }),
	check('color', 'Некорректный цвет').exists({ checkFalsy: true }),
	check('mileage', 'Некорректный пробег').exists({ checkFalsy: true }).custom(value => !isNaN(value)),
	check('price', 'Некорректная цена').exists({ checkFalsy: true }).custom(value => !isNaN(value)),
	check('city', 'Некорректный населенный пункт').exists({ checkFalsy: true }),
]
	, async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: {
						message: "INVALID_DATA",
						code: 400
					}
				});
			}

			const token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.decode(token, { complete: true });
			const userId = decoded.payload._id;

			const { title, year, photos, bodyType, engine, engineVolume, enginePower, gearType, transmission, color, mileage, price, city, ownerDescription } = req.body;

			const carData = {
				userId: userId,
				title: title,
				year: year,
				photos: photos || [],
				bodyType: bodyType,
				engine: engine,
				engineVolume: engineVolume,
				enginePower: enginePower,
				gearType: gearType,
				transmission: transmission,
				color: color,
				mileage: mileage,
				price: price,
				city: city,
				ownerDescription: ownerDescription || '',
			};

			const newCar = await Car.create(carData);

			res.status(201).send(newCar);
		} catch (e) {
			res.status(500).json({
				message: 'На сервере произошла ошибка. Попробуйте позже.'
			});
		}
	});

router.patch('/edit/:id', [
	auth,
	carDataPrepare,
	check('title', 'Некорректный заголовок').exists({ checkFalsy: true }),
	check('year', 'Некорректный год').exists({ checkFalsy: true }).custom(value => {
		val = parseInt(value) || 0;
		const dateNow = new Date();
		return value >= 1900 && value <= parseInt(dateNow.getFullYear());
	}).custom(value => !isNaN(value)),
	check('bodyType', 'Некорректный тип кузова').exists({ checkFalsy: true }),
	check('engine', 'Некорректный тип двигателя').exists({ checkFalsy: true }),
	check('engineVolume', 'Некорректный объем двигателя').exists({ checkFalsy: true }).custom(value => !isNaN(value)),
	check('enginePower', 'Некорректная мощность').exists({ checkFalsy: true }).custom(value => !isNaN(value)),
	check('gearType', 'Некорректный тип привода').exists({ checkFalsy: true }),
	check('transmission', 'Некорректный тип коробки').exists({ checkFalsy: true }),
	check('color', 'Некорректный цвет').exists({ checkFalsy: true }),
	check('mileage', 'Некорректный пробег').exists({ checkFalsy: true }).custom(value => !isNaN(value)),
	check('price', 'Некорректная цена').exists({ checkFalsy: true }).custom(value => !isNaN(value)),
	check('city', 'Некорректный населенный пункт').exists({ checkFalsy: true }),
]
	, async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: {
						message: "INVALID_DATA",
						code: 400
					}
				});
			}

			const { id } = req.params;

			const car = await Car.findById(id);

			if (!car) {
				return res.status(400).json({
					error: {
						message: "SERVER_ERROR",
						code: 400
					}
				});
			}

			const token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.decode(token, { complete: true });
			const userId = decoded.payload._id;

			if (car.userId.toString() !== userId.toString()) {
				return res.status(400).json({
					error: {
						message: "SERVER_ERROR",
						code: 400
					}
				});
			}

			const { title, year, photos, bodyType, engine, engineVolume, enginePower, gearType, transmission, color, mileage, price, city, ownerDescription } = req.body;

			const carData = {
				title: title,
				year: year,
				photos: photos || [],
				bodyType: bodyType,
				engine: engine,
				engineVolume: engineVolume,
				enginePower: enginePower,
				gearType: gearType,
				transmission: transmission,
				color: color,
				mileage: mileage,
				price: price,
				city: city,
				ownerDescription: ownerDescription || '',
			};

			const newCar = await Car.findByIdAndUpdate(id, carData, { new: true });

			res.status(200).send(newCar);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'На сервере произошла ошибка. Попробуйте позже.'
			});
		}
	});

router.delete('/delete/:id', auth, async (req, res) => {
	try {
		const { id } = req.params;

		const car = await Car.findById(id);

		if (!car) {
			return res.status(400).json({
				error: {
					message: "SERVER_ERROR",
					code: 400
				}
			});
		}

		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.decode(token, { complete: true });
		const userId = decoded.payload._id;

		if (car.userId.toString() !== userId.toString()) {
			return res.status(400).json({
				error: {
					message: "SERVER_ERROR",
					code: 400
				}
			});
		}

		await car.remove();
		res.status(204).send(null);

	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже.'
		});
	}
});


module.exports = router;