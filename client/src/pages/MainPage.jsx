import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { CarsList } from '../components/CarsList';
import { Spinner } from '../components/Spinner';
import { fetchLastCars, getLastCarsSelector, getLastCarsLoadingSelector, getLastCarsErrorSelector } from '../store/slices/lastCarsSlice';


const MainPage = () => {
	const dispatch = useDispatch();

	const loading = useSelector(getLastCarsLoadingSelector);
	const error = useSelector(getLastCarsErrorSelector);
	const cars = useSelector(getLastCarsSelector);

	useEffect(() => {
		dispatch(fetchLastCars());
	}, [dispatch]);

	if (error) {
		toast(error, { type: 'error' });
	}

	return (
		<>
			<h1>Захотел &mdash; купил, захотел &mdash; продал</h1>

			<p>Все объявления прошли ручную модерацию, а цены устанавливаются продавцами, тут мы помочь не можем.</p>

			<p>Все совпадения с реальными людьми и объявлениями случайны и не несут полезной нагрузки.</p>

			{!error ?
				<>
					{loading ?
						<Spinner />
						: <CarsList type="flat" title="Последние объявления" cars={cars} hideEmpty />
					}
				</>
				: null
			}
		</>
	);
};

export { MainPage };