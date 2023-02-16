import { Container } from '../Container';
import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
// import { FavouriteBlock } from '../FavouriteBlock';
import { Profile } from '../Profile';
import { Burger } from '../Burger';

import headerLinks from '../../config/headerMenu.json';


import styles from './Header.module.scss';


const Header = () => {
	return (
		<>
			<header className={styles.header}>

				<Container>
					<div className={styles.headerContainer}>

						<div className={styles.headerLeft}>
							<div className={styles.headerLogo}>
								<Logo />
							</div>

							<div className={styles.headerMenuBlock}>
								<Navbar className="headerMenu" items={headerLinks} />
							</div>
						</div>

						<div className={styles.headerRight}>
							{/* <div className={styles.headerFavourite}>
								<FavouriteBlock />
							</div> */}
							<div className={styles.headerProfile}>
								<Profile />
							</div>
							<Burger />
						</div>
					</div>
				</Container>

			</header>

		</>
	);
};

export { Header };