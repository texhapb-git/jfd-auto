import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from '../../components/Spinner';

import { checkAuthUser, checkingAuthSelector } from '../../store/slices/authSlice';

const AppLoader = ({ children }) => {
	const dispatch = useDispatch();
	const loading = useSelector(checkingAuthSelector);

	useEffect(() => {
		dispatch(checkAuthUser());
	}, [dispatch]);


	if (loading) {
		return (
			<Spinner />
		);
	}

	return (
		<>{children}</>
	);

};

AppLoader.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
};

export { AppLoader };