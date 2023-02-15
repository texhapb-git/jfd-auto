const express = require('express');
const Car = require('../models/Car');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const cars = await Car.find();
		res.status(200).send(cars);
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже.'
		});
	}
});


module.exports = router;