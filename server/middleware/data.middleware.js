function dataPrepare(req, res, next) {
	if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
		for (const [key, value] of Object.entries(req.body)) {
			if (typeof (value) === 'string') {
				req.body[key] = value.trim();

				if (key === 'email') {
					req.body[key] = req.body[key].toLowerCase();
				}
			}
		}
	}
	next();
}

function carDataPrepare(req, res, next) {
	if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {

		const numberValues = [
			'year',
			'engineVolume',
			'enginePower',
			'mileage',
			'price'
		];

		for (const [key, value] of Object.entries(req.body)) {

			if (numberValues.includes(key)) {
				req.body[key] = Number(req.body[key]);
			}
		}
	}
	next();
}

module.exports = {
	dataPrepare,
	carDataPrepare
}