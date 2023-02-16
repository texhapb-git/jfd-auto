import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useToggle } from '../../hooks/useToggle';

import { updateCarValues } from '../../utils/car';
import { formatPrice, formatNumber } from '../../utils/numbers';

import { SvgIcon } from '../SvgIcon';
import { Button } from '../Button';

import { deletePersonalCar } from '../../store/slices/personalCarsListSlice';

import styles from './PersonalCarsListItem.module.scss';


const PersonalCarsListItem = ({ car }) => {
	const dispatch = useDispatch();
	const [removing, toggleRemoving] = useToggle(false);

	car = updateCarValues(car);

	if (!car._id) {
		return null;
	}

	return (
		<div className={`${styles.carItemListContainer} ${!removing ? styles.notRemoving : ''}`}>
			<div className={styles.carItemList}>

				<div className={styles.carItemListMobileInfo}>
					<div className={styles.carItemListMobileLink}>
						<Link to={`/cars/${car._id}`}>{car.title}, {car.year}&nbsp;г.</Link>
					</div>

					<div className={styles.carItemListPrice}>
						<span>{formatPrice(car.price)}</span>
					</div>

				</div>

				<div className={styles.carItemListThumb}>
					<div className={styles.carItemListImg} >
						<Link to={`/cars/${car._id}`}>
							<img loading="lazy" alt={`${car.title}, ${car.year}&nbsp;г.`} title={`${car.title}, ${car.year}&nbsp;г.`} src={process.env.PUBLIC_URL + '/upload/cars/1.jpeg'} />
						</Link>
					</div>

				</div>

				<div className={styles.carItemListContent}>

					<div className={styles.carItemListDesktopInfo}>
						<div className={styles.carItemListTitle}>
							<Link to={`/cars/${car._id}`}>{car.title}, {car.year}&nbsp;г.</Link>
						</div>
					</div>


					<div className={styles.carItemListSummary}>

						<div className={styles.carItemListSummaryBlock}>

							<div>{car.engineVolume.toFixed(1)} л&thinsp;/&thinsp;{car.enginePower} л.с&thinsp;/&thinsp;{car?.engine?.title}</div>
							<div>{car?.transmission?.title}</div>
							<div>{car?.bodyType?.title}</div>

						</div>

						<div className={styles.carItemListSummaryBlock}>
							<div>{car?.gearType?.title}</div>
							<div>{car?.color?.title}</div>
							<div className={styles.carItemListSummaryMileage}>{formatNumber(car.mileage)}&nbsp;км</div>
						</div>

					</div>

					<div className={styles.carItemListCity}>
						<span>{car.city}</span>
					</div>

				</div>

				<div className={`${styles.carItemListPrice} ${styles.hideXS}`}>
					<span>{formatPrice(car.price)}</span>
				</div>

				<div className={styles.carItemListMileage}>{formatNumber(car.mileage)}&nbsp;км</div>

				<div className={styles.carItemListButtons}>

					<Link to={`/personal/cars/edit/${car._id}`}>
						<Button type="none" className={styles.carItemListEditButton}>
							<SvgIcon name="pencil" />
						</Button>
					</Link>

					<Button type="none" className={styles.carItemListRemoveButton} onClick={() => toggleRemoving()}>
						<SvgIcon name="bin" />
					</Button>

					<div className={`${styles.carItemListRemoveBlock} ${removing ? styles.active : ''}`} >
						<Button type="none" className={styles.confirmRemove} onClick={() => dispatch(deletePersonalCar(car._id))}>
							<SvgIcon name="check" />
						</Button>

						<Button type="none" className={styles.declineRemove} onClick={() => toggleRemoving()}>
							<SvgIcon name="cross" />
						</Button>

					</div>
				</div>

				<div className={`${styles.carItemShadow} ${removing ? styles.active : ''}`}></div>

			</div>
		</div >
	);


};

PersonalCarsListItem.defaultProps = {
	car: {}
};

PersonalCarsListItem.propTypes = {
	car: PropTypes.object.isRequired
};

export { PersonalCarsListItem };