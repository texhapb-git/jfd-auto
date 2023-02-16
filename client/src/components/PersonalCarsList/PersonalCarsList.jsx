import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PersonalCarsListItem } from '../PersonalCarsListItem';
import { Button } from '../Button';

import styles from './PersonalCarsList.module.scss';

const PersonalCarsList = ({ cars }) => {
	return (
		<div className={styles.carListContainer}>
			<h1>Мои объявления</h1>
			<div className={styles.carListButton}>
				<Link to="/personal/cars/add">
					<Button>Добавить объявление</Button>
				</Link>
			</div>

			{cars.length ?
				<div className={styles.carList}>
					{cars.map(car => <PersonalCarsListItem key={`car-${car.id}`} car={car} />)}
				</div>
				: <p>У Вас нет объявлений</p>
			}

		</div>
	);
};

PersonalCarsList.defaultProps = {
	cars: []
};

PersonalCarsList.propTypes = {
	cars: PropTypes.arrayOf(PropTypes.object)
};

export { PersonalCarsList };