import PropTypes from 'prop-types';

import { CarsListItem } from '../CarsListItem';

import styles from './CarsList.module.scss';

const CarsList = ({ type, title, cars, hideEmpty }) => {


	if (hideEmpty && !cars.length) {
		return null;
	}

	return (
		<div className={styles.carListContainer}>

			{title.length ?
				<h2>{title}</h2>
				: null
			}

			{cars.length ?
				<div className={styles.carList + ' ' + styles[type]}>
					{cars.map(car => {
						if (!car._id) {
							return null;
						}

						return <CarsListItem key={`car-${car._id}`} type={type} car={car} />;
					})}
				</div>
				: <p>Объявлений пока нет.</p>
			}

		</div>
	);
};

CarsList.defaultProps = {
	type: 'list',
	title: '',
	cars: []
};

CarsList.propTypes = {
	type: PropTypes.oneOf(['list', 'flat']),
	title: PropTypes.string,
	cars: PropTypes.arrayOf(PropTypes.object),
	hideEmpty: PropTypes.bool
};

export { CarsList };