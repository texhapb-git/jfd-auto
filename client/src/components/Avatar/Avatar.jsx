import PropTypes from 'prop-types';

import defaultAvatar from '../../assets/images/default-avatar.jpg';

import styles from './Avatar.module.scss';

const Avatar = ({ src, alt, size, className, ...rest }) => {

	if (!src.length) {
		src = defaultAvatar;
	}

	return (
		<>
			<img
				loading="lazy"
				src={src}
				alt={alt}
				className={styles.avatar + ' ' + className}
				style={{ width: `${size}px` }}
				{...rest}
			/>

		</>
	);
};

Avatar.defaultProps = {
	src: '',
	alt: 'User Avatar'
};

Avatar.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string
};

export { Avatar };
