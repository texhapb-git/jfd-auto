import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from '../Button';
import { SvgIcon } from '../SvgIcon';
import { Avatar } from '../Avatar';

import { clearList } from '../../store/slices/personalCarsListSlice';
import { signOut, isAuthSelector, authUserInfoSelector } from '../../store/slices/authSlice';

import styles from './Profile.module.scss';

const Profile = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(isAuthSelector);
	const userInfo = useSelector(authUserInfoSelector);

	const handleLogout = () => {
		dispatch(signOut());
		dispatch(clearList());
	};

	return (
		<div className={styles.profile}>
			{isAuth ?
				<>
					<div className={styles.profileName}>
						<Link to="/personal">{userInfo?.firstName}</Link>
					</div>
					<div className={styles.profileAvatarBlock}>
						<Link to="/personal">
							<Avatar src="" className={styles.profileAvatar} />
						</Link>
					</div>
					<Button type="none" className={styles.profileLogout} onClick={handleLogout} title="Выйти">
						<SvgIcon name="logout" />
					</Button>

				</>
				:
				<Link to="/auth"><Button styleType="secondary">Войти</Button></Link>
			}

		</div>
	);
};

export { Profile };