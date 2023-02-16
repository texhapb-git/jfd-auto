import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import { EditForm } from '../components/EditFrom';

import { Spinner } from '../components/Spinner';

import { authUserIdSelector } from '../store/slices/authSlice';

import carsService from '../services/cars.service';

const PersonalCarEditPage = () => {
	const { carId } = useParams();
	const [loading, setLoading] = useState(true);
	const [car, setCar] = useState({});
	const navigate = useNavigate();

	const userId = useSelector(authUserIdSelector);

	useEffect(() => {
		setLoading(true);

		(async function () {
			try {
				const response = await carsService.getCarById(carId);

				if (response.status !== 200) {
					throw new Error('Server failed');
				}

				const car = response.data;

				if (String(car.userId) !== String(userId)) {
					navigate('/personal/cars');
				}

				setCar(car);
				setLoading(false);

			} catch (e) {
				navigate('/personal/cars');
				toast(e.message, { type: 'error' });
			}

		})();

	}, [carId, userId, navigate]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<EditForm car={car} />
	);
};

export { PersonalCarEditPage };