import * as yup from 'yup';

const schema = yup.object().shape({
	title: yup.string().trim().required('Поле обязательно для заполнения'),
	year: yup.string().trim().required('Поле обязательно для заполнения').test('val', 'Укажите правильный год', (val) => {
		val = parseInt(val) || 0;
		const dateNow = new Date();
		return val >= 1900 && val <= parseInt(dateNow.getFullYear());
	}),
	bodyType: yup.string().trim().required('Поле обязательно для заполнения'),
	engine: yup.string().trim().required('Поле обязательно для заполнения'),
	engineVolume: yup.string().trim().required('Поле обязательно для заполнения').matches(/^[0-9]+\.[0-9]$/i, 'Поле может содержать только цифры'),
	enginePower: yup.string().trim().required('Поле обязательно для заполнения').matches(/^([0-9]*)$/, 'Поле может содержать только цифры'),
	gearType: yup.string().trim().required('Поле обязательно для заполнения'),
	transmission: yup.string().trim().required('Поле обязательно для заполнения'),
	color: yup.string().trim().required('Поле обязательно для заполнения'),
	mileage: yup.string().trim().required('Поле обязательно для заполнения').matches(/^([0-9]*)$/, 'Поле может содержать только цифры'),
	price: yup.string().trim().required('Поле обязательно для заполнения').matches(/^([0-9]*)$/, 'Поле может содержать только цифры'),
	city: yup.string().trim().required('Поле обязательно для заполнения'),
});

export { schema };