const { Schema, model } = require('mongoose');

const schema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	title: { type: String, required: true },
	year: { type: Number, required: true },
	photos: [{ type: String }],
	bodyType: { type: String, required: true },
	engine: { type: String, required: true },
	engineVolume: { type: Number, required: true },
	enginePower: { type: Number, required: true },
	gearType: { type: String, required: true },
	transmission: { type: String, required: true },
	color: { type: String, required: true },
	mileage: { type: Number, required: true },
	price: { type: Number, required: true },
	city: { type: String, required: true },
	ownerDescription: { type: String },
}, {
	timestamps: true
});

module.exports = model('Car', schema);