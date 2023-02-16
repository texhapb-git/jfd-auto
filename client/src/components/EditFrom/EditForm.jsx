import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { TextField } from '../TextField';
import { RadioField } from '../RadioField';
import { Button } from '../Button';

import bodyTypes from '../../carsData/bodyTypes.json';
import engines from '../../carsData/engines.json';
import gearTypes from '../../carsData/gearTypes.json';
import transmissions from '../../carsData/transmissions.json';
import colors from '../../carsData/colors.json';

import { createPersonalCar, updatePersonalCar } from '../../store/slices/personalCarsListSlice.js';

import { schema } from '../../validations/editFormValidation';

import styles from './EditForm.module.scss';


const EditForm = ({ car }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isEditCar = !!car._id;

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema)
	});

	const onFormSubmit = (formData) => {

		if (!isEditCar) {
			dispatch(createPersonalCar(formData))
				.unwrap()
				.then(response => {
					if (response._id) {
						toast('Объявление создано');
						navigate(`/personal/cars/edit/${response._id}`);
					}
				})
				.catch(error => {
					toast(error, { type: 'error' });
				});
		} else {
			dispatch(updatePersonalCar({ id: car._id, data: formData }))
				.unwrap()
				.then(response => {
					if (response._id) {
						toast('Объявление изменено');
					}
				})
				.catch(error => {
					toast(error, { type: 'error' });
				});
		}
	};

	return (
		<div className={styles.editForm}>

			<div className={styles.editFormTitle}>{isEditCar ? 'Редактирование' : 'Создание'} объявления</div>

			<form noValidate autoComplete="off" onSubmit={handleSubmit(onFormSubmit)}>

				<div className={styles.editFormRow}>
					<div className={styles.editFormColFull}>
						<TextField
							label="Укажите марку, модель и поколение авто"
							value={car?.title}
							name="title"
							required
							register={register}
							error={!!errors?.title}
							errorMessage={errors?.title?.message}
						/>
					</div>
				</div>

				<div className={styles.editFormRow}>
					<div className={styles.editFormCol}>
						<TextField
							label="Год выпуска"
							value={car?.year}
							name="year"
							required
							register={register}
							error={!!errors?.year}
							errorMessage={errors?.year?.message}
						/>
					</div>
				</div>

				<div className={styles.editFormRow}>
					<RadioField
						label="Тип кузова"
						name="bodyType"
						valuesList={bodyTypes}
						value={car?.bodyType}
						register={register}
						required
						withImage
						error={!!errors?.bodyType}
						errorMessage={errors?.bodyType?.message}
					/>
				</div>

				<div className={styles.editFormRow}>
					<RadioField
						label="Двигатель"
						name="engine"
						valuesList={engines}
						value={car?.engine}
						register={register}
						required
						error={!!errors?.engine}
						errorMessage={errors?.engine?.message}
					/>
				</div>

				<div className={styles.editFormRow}>
					<div className={styles.editFormCol}>
						<TextField
							type="number"
							label="Объем двигателя, л"
							value={car?.engineVolume}
							name="engineVolume"
							register={register}
							required
							error={!!errors?.engineVolume}
							errorMessage={errors?.engineVolume?.message}
						/>
					</div>
					<div className={styles.editFormCol}>
						<TextField
							type="number"
							label="Мощность двигателя, л.с."
							value={car?.enginePower}
							name="enginePower"
							required
							register={register}
							error={!!errors?.enginePower}
							errorMessage={errors?.enginePower?.message}
						/>
					</div>
				</div>

				<div className={styles.editFormRow}>
					<RadioField
						label="Привод"
						name="gearType"
						valuesList={gearTypes}
						value={car?.gearType}
						register={register}
						required
						error={!!errors?.gearType}
						errorMessage={errors?.gearType?.message}
					/>
				</div>

				<div className={styles.editFormRow}>
					<RadioField
						label="Коробка передач"
						name="transmission"
						valuesList={transmissions}
						value={car?.transmission}
						register={register}
						required
						error={!!errors?.transmission}
						errorMessage={errors?.transmission?.message}
					/>
				</div>

				<div className={styles.editFormRow}>
					<RadioField
						label="Цвет"
						name="color"
						valuesList={colors}
						value={car?.color}
						register={register}
						required
						error={!!errors?.color}
						errorMessage={errors?.color?.message}
					/>
				</div>

				<div className={styles.editFormRow}>
					<div className={styles.editFormCol}>
						<TextField
							type="number"
							label="Пробег, км"
							value={car?.mileage}
							name="mileage"
							required
							register={register}
							error={!!errors?.mileage}
							errorMessage={errors?.mileage?.message}
						/>
					</div>
					<div className={styles.editFormCol}>
						<TextField
							type="number"
							label="Цена, руб."
							value={car?.price}
							name="price"
							required
							register={register}
							error={!!errors?.price}
							errorMessage={errors?.price?.message}
						/>
					</div>
				</div>

				<div className={styles.editFormRow}>
					<div className={styles.editFormColFull}>
						<TextField
							label="Населенный пункт"
							value={car?.city}
							name="city"
							required
							register={register}
							error={!!errors?.city}
							errorMessage={errors?.city?.message}
						/>
					</div>
				</div>

				<div className={styles.editFormRow}>
					<div className={styles.editFormColFull}>
						<TextField
							type="textarea"
							label="Комментарий"
							value={car?.ownerDescription}
							name="ownerDescription"
							register={register}
							error={!!errors?.ownerDescription}
							errorMessage={errors?.ownerDescription?.message}
						/>
					</div>
				</div>

				<div className={styles.signUpFormButtons}>
					<Button buttonType="submit">Сохранить объявление</Button>
					<div className={styles.signUpFormLink}>
						<Link to="/personal/cars">Отмена</Link>
					</div>
				</div>

			</form>
		</div>
	);
};

EditForm.defaultProps = {
	car: {}
};

EditForm.propTypes = {
	car: PropTypes.object
};

export { EditForm };