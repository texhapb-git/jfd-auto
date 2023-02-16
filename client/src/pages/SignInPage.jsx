import { useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';

import { SignInForm } from '../components/SignInForm';

import { isAuthSelector } from '../store/slices/authSlice';

const SignInPage = () => {
	const isAuth = useSelector(isAuthSelector);
	return (
		<>
			{isAuth ?
				<Navigate to="/personal" />
				: <SignInForm />
			}
		</>
	);
};

export { SignInPage };