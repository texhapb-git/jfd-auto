import PropTypes from 'prop-types';

import styles from './Main.module.scss';

const Main = ({ children }) => {
	return (
		<main className={styles.main}>
			{children}
		</main>
	);
};

Main.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
};

export { Main };