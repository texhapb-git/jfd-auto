import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { CarsList } from '../components/CarsList';
import { SortingCarsList } from '../components/SortingCarsList';
import { Spinner } from '../components/Spinner';

import { fetchCarsList, getCarsListSelector, getCarsListSortSelector, getCarsListLoadingSelector, getCarsListErrorSelector } from '../store/slices/carsListSlice';

import sorting from '../config/sorting.json';

const CarsListPage = () => {
	const dispatch = useDispatch();

	const loading = useSelector(getCarsListLoadingSelector);
	const error = useSelector(getCarsListErrorSelector);
	const cars = useSelector(getCarsListSelector);
	const sortId = useSelector(getCarsListSortSelector);

	useEffect(() => {
		const currentSort = sorting.find(sort => sort.id === sortId);

		const params = {
			'limit': 30,
			'sort': currentSort.sort,
			'order': currentSort.order
		};

		dispatch(fetchCarsList(params));
	}, [sortId, dispatch]);

	if (error) {
		toast(error, { type: 'error' });
	}

	return (
		<>
			<h1>Каталог объявлений</h1>
			<SortingCarsList />

			{!error ?
				<>
					{loading ?
						<Spinner />
						: <CarsList type="list" cars={cars} />
					}
				</>
				: null
			}
		</>

	);
};

export { CarsListPage };