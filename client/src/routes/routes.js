import { Navigate } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';
import { InnerLayout } from '../layouts/InnerLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { PersonalLayout } from '../layouts/PersonalLayout';

import { ProtectedRoute } from '../components/ProtectedRoute';

import { MainPage } from '../pages/MainPage';
import { AboutPage } from '../pages/AboutPage';
import { CarsListPage } from '../pages/CarsListPage';
import { CarDetailPage } from '../pages/CarDetailPage';
import { FavouritesPage } from '../pages/FavouritesPage';

import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';

import { PersonalAccountPage } from '../pages/PersonalAccountPage';
import { PersonalCarsPage } from '../pages/PersonalCarsPage';
import { PersonalCarEditPage } from '../pages/PersonalCarEditPage';
import { PersonalCarAddPage } from '../pages/PersonalCarAddPage';



const routes = [
	{
		path: '',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <MainPage />
			}
		]
	},
	{
		path: 'about',
		element: <InnerLayout />,
		children: [
			{
				index: true,
				element: <AboutPage />
			}
		]
	},
	{
		path: 'cars',
		element: <InnerLayout />,
		children: [
			{
				index: true,
				element: <CarsListPage />
			},
			{
				path: ':carId',
				element: <CarDetailPage />,
			}
		]
	},
	{
		path: 'favourites',
		element: <InnerLayout />,
		children: [
			{
				index: true,
				element: <FavouritesPage />
			}
		]
	},
	{
		path: 'auth',
		element: <AuthLayout />,
		children: [
			{
				index: true,
				element: <Navigate to="/auth/signin" />
			},
			{
				path: 'signin',
				element: <SignInPage />
			},
			{
				path: 'signup',
				element: <SignUpPage />
			},
			{
				path: '*',
				element: <Navigate to="/auth/signin" />
			}
		]
	},
	{
		path: 'personal',
		element: <ProtectedRoute><PersonalLayout /></ProtectedRoute>,
		children: [
			{
				index: true,
				element: <Navigate to="/personal/account" />
			},
			{
				path: 'account',
				element: <PersonalAccountPage />
			},
			{
				path: 'cars',
				element: <PersonalCarsPage />,
			},
			{
				path: 'cars/add',
				element: <PersonalCarAddPage />
			},
			{
				path: 'cars/edit/:carId',
				element: <PersonalCarEditPage />
			},
			{
				path: '*',
				element: <Navigate to="/personal/account" />
			}

		]
	},
	{
		path: '*',
		element: <Navigate to="/" />
	}
];


export default routes;