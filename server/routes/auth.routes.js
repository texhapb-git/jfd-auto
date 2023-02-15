const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const tokenService = require('../services/token.service');

const router = express.Router({ mergeParams: true });

router.post('/signUp', [
	// check('email', 'Некорректный email').isEmail(),
	// check('password', 'Некорректный пароль').isLength({ min: 3 })
], async (req, res) => {
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

		const { email, password, confirmPassword, firstName, lastName, phone } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({
				error: {
					message: "PASSWORDS_NOT_EQUAL",
					code: 400
				}
			});
		}

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				error: {
					message: "EMAIL_EXISTS",
					code: 400
				}
			});
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const userData = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hashedPassword,
			phone: phone
		};

		const newUser = await User.create(userData);
		const tokens = tokenService.generate({ _id: newUser._id });
		await tokenService.save(newUser._id, tokens.refreshToken);

		res.status(201).send({ ...tokens, userId: newUser._id });

	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже.'
		});
	}
});

router.post('/signInWithPassword', async (req, res) => {

});

router.post('/token', async (req, res) => {

});

module.exports = router;