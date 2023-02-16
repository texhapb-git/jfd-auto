import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { isAuthSelector } from '../../store/slices/authSlice';

const ProtectedRoute = ({ children }) => {
	const location = useLocation();

	const isAuth = useSelector(isAuthSelector);

	if (!isAuth) {
		return <Navigate to="/auth/signin" state={{ referref: location }} />;
	}

	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
};

export { ProtectedRoute };