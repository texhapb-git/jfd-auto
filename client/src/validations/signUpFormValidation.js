import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

const schema = yup.object().shape({
	firstName: yup.string().trim().required('Поле обязательно для заполнения').matches(/^([^0-9]*)$/, 'Имя может содержать только буквы'),
	lastName: yup.string().trim().matches(/^([^0-9]*)$/, 'Фамилия может содержать только буквы'),
	email: yup.string().trim().required('Поле обязательно для заполнения').matches(/^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,20}$/, 'Введите корректный email'),
	password: yup.string().trim().required('Поле обязательно для заполнения').matches(/^([^а-яА-Я]*)$/, 'Только латиница').matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, ' Пароль не соответствует требованиям'),
	passwordConfirm: yup.string().trim().required('Поле обязательно для заполнения').oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
	phone: yup.string().trim().required('Поле обязательно для заполнения').matches(/^([0-9]*)$/, 'Телефон может содержать только цифры').length(10, 'Телефон должен содержать 10 цифр'),
});

export { schema };