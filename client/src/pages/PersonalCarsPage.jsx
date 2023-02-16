import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { Spinner } from '../components/Spinner';
import { PersonalCarsList } from '../components/PersonalCarsList';

import { isAuthSelector, authUserIdSelector } from '../store/slices/authSlice';
import { fetchPersonalCarsList, getPersonalCarsListSelector, getPersonalCarsListLoadingSelector, getPersonalCarsListErrorSelector } from '../store/slices/personalCarsListSlice';

const PersonalCarsPage = () => {
	const dispatch = useDispatch();

	const isAuth = useSelector(isAuthSelector);
	const userId = useSelector(authUserIdSelector);

	const loading = useSelector(getPersonalCarsListLoadingSelector);
	const error = useSelector(getPersonalCarsListErrorSelector);
	const cars = useSelector(getPersonalCarsListSelector);

	useEffect(() => {
		if (isAuth && userId) {
			const params = {
				'userId': userId,
				'sort': 'createdAt',
				'order': 'desc'
			};

			dispatch(fetchPersonalCarsList(params));
		}

	}, [isAuth, userId, dispatch]);

	if (error) {
		toast(error, { type: 'error' });
	}

	return (
		<>
			{loading ?
				<Spinner />
				: <PersonalCarsList cars={cars} />
			}
		</>
	);
};

export { PersonalCarsPage };