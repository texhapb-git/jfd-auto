import { Container } from '../Container';
import { Navbar } from '../Navbar';
import { Logo } from '../Logo';

import footerLinks from '../../config/footerMenu.json';

import styles from './Footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<div className={styles.footerContainer}>

					<div className={styles.footerLeft}>
						<div className={styles.footerLogo}>
							<Logo />
						</div>
						<div className={styles.footerMenuBlock}>
							<Navbar className="footerMenu" items={footerLinks} />
						</div>
					</div>

					<div className={styles.footerRight}>
						<div className={styles.footerCopyright}>© {new Date().getFullYear()}, all rights reserved</div>
					</div>


				</div>
			</Container>
		</footer>
	);
};

export { Footer };