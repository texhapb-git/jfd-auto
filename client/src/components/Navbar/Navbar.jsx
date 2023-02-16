import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { isAuthSelector } from '../../store/slices/authSlice';

import styles from './Navbar.module.scss';

const Navbar = ({ items, className, onClick }) => {

	const isAuth = useSelector(isAuthSelector);

	return (
		<>
			{
				items.length ?
					<>
						<nav className={styles[className]}>
							<ul>
								{items.map(link => {
									if (link.auth && !isAuth) {
										return null;
									}

									return <li key={link.id}>
										<NavLink onClick={onClick} className={({ isActive }) =>
											isActive ? styles.active : ''
										} to={link.path}>{link.title}</NavLink>
									</li>;
								})}
							</ul>
						</nav>
					</>
					: null
			}
		</>

	);
};

Navbar.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func
};

export { Navbar };