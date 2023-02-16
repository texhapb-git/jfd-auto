const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const tokenService = require('../services/token.service');
const Token = require('../models/Token');

const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

router.post('/signUp', [
	check('email', 'Некорректный email').exists({ checkFalsy: true }).matches(/^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,20}$/, 'i'),
	check('password', 'Некорректный пароль').exists({ checkFalsy: true }).matches(/^([^а-яА-Я]*)$/, 'i').matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, 'i'),
	check('passwordConfirm', 'Пароли не совпадают').exists({ checkFalsy: true }).custom((value, { req }) => value === req.body.password),
	check('firstName', 'Некорректное имя').exists({ checkFalsy: true }).matches(/^([^0-9]*)$/, 'i'),
	check('lastName', 'Некорректная фамилия').matches(/^([^0-9]*)$/, 'i'),
	check('phone', 'Некорректный телефон').exists({ checkFalsy: true }).matches(/^([0-9]*)$/, 'i').isLength({ min: 10, max: 10 }),
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

		const { email, password, firstName, lastName, phone } = req.body;
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
			lastName: lastName || '',
			email: email,
			password: hashedPassword,
			phone: phone
		};

		const newUser = await User.create(userData);
		const tokens = tokenService.generate({ _id: newUser._id });
		await tokenService.save(newUser._id, tokens.refreshToken);

		const responseUserInfo = {
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			phone: newUser.phone
		}

		res.status(201).send({ ...tokens, userId: newUser._id, userInfo: responseUserInfo });

	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже.'
		});
	}
});

router.post('/signInWithPassword', [
	check('email', 'Некорректный email').exists({ checkFalsy: true }).matches(/^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,20}$/, 'i'),
	check('password', 'Пароль не может быть пустым').exists({ checkFalsy: true })
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

		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.status(400).json({
				error: {
					message: "WRONG_EMAIL_PASSWORD",
					code: 400
				}
			});
		}

		const isPasswordsEqual = await bcrypt.compare(password, existingUser.password);

		if (!isPasswordsEqual) {
			return res.status(400).json({
				error: {
					message: "WRONG_EMAIL_PASSWORD",
					code: 400
				}
			});
		}

		const tokens = tokenService.generate({ _id: existingUser._id });
		await tokenService.save(existingUser._id, tokens.refreshToken);

		const responseUserInfo = {
			firstName: existingUser.firstName,
			lastName: existingUser.lastName,
			email: existingUser.email,
			phone: existingUser.phone
		}

		res.status(200).send({ ...tokens, userId: existingUser._id, userInfo: responseUserInfo });

	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже.'
		});
	}
});

function isTokenValid(data, dbToken) {
	return data && dbToken && data._id === dbToken?.userId?.toString();
}

router.post('/token', async (req, res) => {
	try {
		const { refreshToken } = req.body;
		const data = tokenService.validateRefresh(refreshToken);
		const dbToken = await tokenService.findToken(refreshToken);

		if (!isTokenValid(data, dbToken)) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const tokens = tokenService.generate({ _id: data._id });
		await tokenService.save(data._id, tokens.refreshToken);

		res.status(200).send({ ...tokens, userId: data._id });
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже.'
		});
	}
});

router.get('/me', auth, async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.decode(token, { complete: true });
		const userId = decoded.payload._id;

		const user = await User.findById(userId, { _id: 1, firstName: 1, lastName: 1, email: 1, phone: 1 });

		if (!user) {
			return res.status(400).json({
				error: {
					message: "SERVER_ERROR",
					code: 400
				}
			});
		}

		res.status(200).send(user);
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже.'
		});
	}
});

module.exports = router;