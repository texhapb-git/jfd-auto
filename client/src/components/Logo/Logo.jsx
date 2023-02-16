import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

const Logo = () => {
	return (
		<div className={styles.logo}>
			<Link to="/">Auto<span>S</span></Link>
		</div>
	);
};

export { Logo };