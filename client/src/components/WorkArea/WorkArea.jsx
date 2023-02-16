import PropTypes from 'prop-types';

import styles from './WorkArea.module.scss';

const WorkArea = ({ children }) => {
	return (
		<div className={styles.workarea}>
			{children}
		</div>
	);
};

WorkArea.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
};

export { WorkArea };