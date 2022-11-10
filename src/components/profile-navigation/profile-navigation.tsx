import styles from './profile-navigation.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { INavData } from '../../types/data';
import { logout } from '../../services/user-slice';
import { PreloaderSmall } from '../preloader/preloader-small';
import { FC } from 'react';

export const ProfileNavigation: FC = (): JSX.Element => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.user);

    const classNameToggle = (navData: INavData) => (navData.isActive ? 'text text_type_main-medium' : 'text text_type_main-medium text_color_inactive');

    const handleLogout = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(logout());
    };
    return (
        <div className={styles.column}>
            <ul className={styles.profileNavigation}>
                <li>
                    <NavLink end to='/profile' className={classNameToggle}>
                        Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink end to='/profile/orders' className={classNameToggle}>
                        История заказов
                    </NavLink>
                </li>
                <li onClick={(e) => handleLogout(e)} className={styles.pointer}>
                    <p className='text text_type_main-medium text_color_inactive'>Выход</p>
                </li>
                {loading && <PreloaderSmall />}
            </ul>
            <div className={styles.marginAndOpacity}>
                <p className='text text_type_main-small text_color_inactive'>
                    {location.pathname === '/profile/orders'
                        ? 'В этом разделе вы можете просмотреть свою историю заказов'
                        : 'В этом разделе вы можете изменить свои персональные данные'}
                </p>
            </div>
        </div>
    );
};
