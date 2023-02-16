
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '../TextField';
import { Button } from '../Button';

import { signUpApp, registerErrorSelector } from '../../store/slices/authSlice';

import { schema } from '../../validations/signUpFormValidation';

import styles from './SignUpForm.module.scss';


const SignUpForm = () => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema)
	});

	const registerError = useSelector(registerErrorSelector);

	const onFormSubmit = (formData) => {
		dispatch(signUpApp(formData));
	};

	return (
		<div className={styles.signUpForm}>

			<div className={styles.signUpFormTitle}>Создать аккаунт</div>

			<form noValidate autoComplete="off" onSubmit={handleSubmit(onFormSubmit)}>

				<TextField
					label="Имя"
					value=""
					name="firstName"
					register={register}
					required
					error={!!errors?.firstName}
					errorMessage={errors?.firstName?.message}
				/>
				<TextField
					label="Фамилия"
					value=""
					name="lastName"
					register={register}
					error={!!errors?.lastName}
					errorMessage={errors?.lastName?.message}
				/>
				<TextField
					type="email"
					label="Email"
					value=""
					name="email"
					register={register}
					required
					error={!!errors?.email}
					errorMessage={errors?.email?.message}
				/>

				<TextField
					type="password"
					label="Пароль"
					value=""
					name="password"
					required
					comment="Пароль должен быть на латинице, не менее 6 символов, содержать цифры, большие и маленькие буквы"
					register={register}
					error={!!errors?.password}
					errorMessage={errors?.password?.message} />

				<TextField
					type="password"
					label="Повторите пароль"
					value=""
					name="passwordConfirm"
					required
					register={register}
					error={!!errors?.passwordConfirm}
					errorMessage={errors?.passwordConfirm?.message} />

				<TextField
					type="number"
					label="Телефон"
					value=""
					name="phone"
					register={register}
					required
					error={!!errors?.phone}
					errorMessage={errors?.phone?.message}
				/>

				{registerError &&
					<div className={styles.signUpFormErrors}>
						{registerError}
					</div>
				}


				<div className={styles.signUpFormButtons}>
					<Button buttonType="submit">Создать аккаунт</Button>
					<div className={styles.signUpFormLink}>
						<Link to="/auth">Войти</Link>
					</div>
				</div>

			</form>
		</div>
	);
};

export { SignUpForm };