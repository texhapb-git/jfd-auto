import PropTypes from 'prop-types';

import styles from './Container.module.scss';

const Container = ({ children }) => {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
};

Container.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
};

export { Container };