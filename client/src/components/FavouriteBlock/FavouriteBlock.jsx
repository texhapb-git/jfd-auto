import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { SvgIcon } from '../SvgIcon';

import { getFavouritesCountSelector } from '../../store/slices/favouritesSlice';

import styles from './FavouriteBlock.module.scss';


const FavouriteBlock = () => {

	const count = useSelector(getFavouritesCountSelector);

	return (
		<div className={styles.fav}>
			<Link to="/favourites">
				<SvgIcon name="heart" />
				{count > 0 ?
					<span className={styles.favCount}>{count}</span>
					: null
				}
			</Link>

		</div>
	);
};

export { FavouriteBlock };