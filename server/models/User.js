const { Schema, model } = require('mongoose');

const schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phone: { type: String, required: true }
}, {
	timestamps: true
});

module.exports = model('User', schema);