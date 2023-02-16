import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToggle } from '../../hooks/useToggle';

import { setSort, getCarsListSortSelector } from '../../store/slices/carsListSlice';

import sorting from '../../config/sorting.json';

import styles from './SortingCarsList.module.scss';

const SortingCarsList = () => {
	const dispatch = useDispatch();
	const sortId = useSelector(getCarsListSortSelector);

	const [open, toggleOpen] = useToggle(false);

	const handleChange = (value) => {
		dispatch(setSort({ sort: value }));
		toggleOpen();
	};

	const currentSort = useMemo(() => {
		return sorting.find(sort => sort.id === sortId);
	}, [sortId]);

	return (
		<div className={styles.sortingCarsList}>
			<div className={styles.dropdown}>
				<button className={styles.dropDownButton} onClick={toggleOpen}>{currentSort.title}</button>
				<ul className={`${open ? styles.active : ''}`}>
					{sorting.map(sort => (
						<li key={sort.id} onClick={() => handleChange(sort.id)} className={`${sort.id === sortId ? styles.active : ''}`}>
							{sort.title}
						</li>
					))}

				</ul>
			</div>
		</div>
	);
};

export { SortingCarsList };