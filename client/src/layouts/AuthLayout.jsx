import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { WorkArea } from '../components/WorkArea';
import { MobileMenu } from '../components/MobileMenu';

const AuthLayout = () => {
	return (
		<>
			<Header />
			<Main>
				<WorkArea>
					<Container>
						<Outlet />
					</Container>
				</WorkArea>
			</Main>
			<Footer />
			<MobileMenu />
		</>
	);
};

export { AuthLayout };