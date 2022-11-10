import '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useState } from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, MenuIcon, ArrowDownIcon, ArrowUpIcon, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import logoOnlyBurger from '../../images/logo-only-burger.svg';
import { NavLink } from 'react-router-dom';
import { INavData } from '../../types/data';

const AppHeader:FC = (): JSX.Element => {
    const [toggle, setToggle] = useState(true);
    const [openMenu, setOpenMenu] = useState(false);

    const useStyle = openMenu ? styles.menuOpen : styles.menuClose;

    // TOGGLE ACTIVE & INACTIVE CLASS
    const classNameToggle = (navData: INavData): string => {
        return navData.isActive ? 'text text_type_main-small' : 'text text_type_main-small text_color_inactive'
    };

    return (
        <header>
            <nav>
                <div className={styles.menuCloseIconContainer}>
                    <img src={logoOnlyBurger} alt='Логотип Бургерной' className={styles.onlyBurgerLogo} />
                    <div className={styles.burgerIcon}>
                        <MenuIcon type="primary" onClick={() => setOpenMenu((prev) => !prev)} />
                    </div>
                </div>
                <div className={useStyle}>
                    {/* MENU + CLOSE ICON */}
                    <div className={styles.menuCloseIconContainer}>
                        <h1 className='text text_type_main-large'>Меню</h1>
                        <div className={styles.closeIcon}>
                            <CloseIcon type="primary" onClick={() => setOpenMenu((prev) => !prev)} />
                        </div>
                    </div>
                    {/* MAIN NAV */}
                    <ul>
                        <li className={styles.profile}>
                            <NavLink to='/profile' className={classNameToggle}>
                                <div className={styles.textIconContainer}>
                                    <ProfileIcon type='primary' />
                                    <p>Личный кабинет</p>
                                </div>
                            </NavLink>
                            <div className={styles.arrowIcon} onClick={() => setToggle((prev) => !prev)}>
                                {toggle && <ArrowDownIcon type='primary' />}
                                {!toggle && <ArrowUpIcon type='primary' />}
                            </div>
                        </li>
                        {!toggle && (
                            <li>
                                <div className={styles.subMenu}>
                                    <NavLink to='/' className={classNameToggle}>
                                        Профиль
                                    </NavLink>
                                    <NavLink to='/' className={classNameToggle}>
                                        История заказов
                                    </NavLink>
                                    <NavLink to='/' className={classNameToggle}>
                                        Выход
                                    </NavLink>
                                </div>
                            </li>
                        )}
                        <li className={styles.burgerConstructor}>
                            <NavLink end to='/' className={classNameToggle}>
                                <div className={styles.textIconContainer}>
                                    <BurgerIcon type='primary' />
                                    <p>Конструктор Бургеров</p>
                                </div>
                            </NavLink>
                        </li>
                        <li className={styles.orders}>
                            <NavLink to='/feed' className={classNameToggle}>
                                <div className={styles.textIconContainer}>
                                    <ListIcon type='primary' />
                                    <p>Лента заказов</p>
                                </div>
                            </NavLink>
                        </li>
                        <li className={styles.fullLogoThird}>
                            <NavLink to='/'>
                                <div className={styles.textIconContainer}>
                                    <Logo />
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
