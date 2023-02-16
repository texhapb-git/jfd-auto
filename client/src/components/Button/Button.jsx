import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = ({ children, className, buttonType, type, styleType, bgColor, textColor, ...rest }) => {

	const classes = [styles.btn];

	if (type === 'none') {
		classes.push('none');
	}

	if (type === 'default') {
		classes.push(styles['default']);

		classes.push(styles[styleType]);
	}

	classes.push(className);

	return (
		<button
			type={buttonType}
			className={classes.join(' ')}
			style={{ backgroundColor: bgColor, color: textColor }}
			{...rest}
		>
			{children}
		</button>
	);
};

Button.defaultProps = {
	buttonType: 'button',
	type: 'default',
	styleType: 'primary'
};

Button.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	className: PropTypes.string,
	buttonType: PropTypes.string,
	styleType: PropTypes.string,
	type: PropTypes.oneOf(['default', 'none']),
	bgColor: PropTypes.string,
	textColor: PropTypes.string,
};

export { Button };