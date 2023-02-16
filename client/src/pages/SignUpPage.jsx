import { useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';

import { SignUpForm } from '../components/SignUpForm';

import { isAuthSelector } from '../store/slices/authSlice';

const SignUpPage = () => {
	const isAuth = useSelector(isAuthSelector);
	return (
		<>
			{isAuth ?
				<Navigate to="/personal" />
				: <SignUpForm />
			}
		</>
	);
};

export { SignUpPage };