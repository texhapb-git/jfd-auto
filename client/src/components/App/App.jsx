import { useRoutes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import routes from '../../routes/routes';

import 'react-toastify/dist/ReactToastify.css';
import '../../styles/main.scss';
import { AppLoader } from '../../hoc/AppLoader';


const App = () => {

	const appRoutes = useRoutes(routes);

	return (
		<>
			<AppLoader>
				{appRoutes}
			</AppLoader>

			<ToastContainer />
		</>
	);
};

export { App };
