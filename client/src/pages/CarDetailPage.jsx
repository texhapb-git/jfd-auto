import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { CarDetail } from '../components/CarDetail';
import { Spinner } from '../components/Spinner';

import { fetchCar, getCarDetailSelector, getCarDetailLoadingSelector, getCarDetailErrorSelector } from '../store/slices/carDetailSlice';


const CarDetailPage = () => {
	const dispatch = useDispatch();

	const { carId } = useParams();

	const loading = useSelector(getCarDetailLoadingSelector);
	const error = useSelector(getCarDetailErrorSelector);
	const car = useSelector(getCarDetailSelector);

	useEffect(() => {
		dispatch(fetchCar(carId));
	}, [carId, dispatch]);

	if (error) {
		toast(error, { type: 'error' });
	}

	return (
		<>
			{!error ?
				<>
					{loading ?
						<Spinner />
						: <CarDetail car={car} />
					}
				</>
				: null
			}
		</>
	);
};

export { CarDetailPage };