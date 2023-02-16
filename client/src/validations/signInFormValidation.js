import * as yup from 'yup';

const schema = yup.object().shape({
	email: yup.string().trim().required('Поле обязательно для заполнения').matches(/^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,20}$/, 'Введите корректный email'),
	password: yup.string().trim().required('Поле обязательно для заполнения')
});

export { schema };