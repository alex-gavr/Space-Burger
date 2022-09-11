import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import styles from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    MenuIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import logoOnlyBurger from "../../images/logo-only-burger.svg";

const AppHeader = () => {
    const [toggle, setToggle] = useState(true);
    const [openMenu, setOpenMenu] = useState(false);

    const useStyle = openMenu ? styles.menuOpen : styles.menuClose;

    return (
        <header>
            <nav>
                <div className={styles.menuCloseIconContainer}>
                    <img
                        src={logoOnlyBurger}
                        alt="Логотип Бургерной"
                        className={styles.onlyBurgerLogo}
                    />
                    <div className={styles.burgerIcon}>
                        <MenuIcon
                            onClick={() => setOpenMenu((prev) => !prev)}
                        />
                    </div>
                </div>
                <div className={useStyle}>
                    {/* MENU + CLOSE ICON */}
                    <div className={styles.menuCloseIconContainer}>
                        <h1 className="text text_type_main-large">Меню</h1>
                        <div className={styles.closeIcon}>
                            <CloseIcon
                                onClick={() => setOpenMenu((prev) => !prev)}
                            />
                        </div>
                    </div>
                    {/* MAIN NAV */}
                    <ul>
                        <li className={styles.profile}>
                            <a href="/">
                                <div className={styles.textIconContainer}>
                                    <ProfileIcon type="primary" />
                                    <p className="text text_type_main-small text_color_inactive">
                                        Личный кабинет
                                    </p>
                                </div>
                            </a>
                            <div
                                className={styles.arrowIcon}
                                onClick={() => setToggle((prev) => !prev)}
                            >
                                {toggle && <ArrowDownIcon type="primary" />}
                                {!toggle && <ArrowUpIcon type="primary" />}
                            </div>
                        </li>
                        {!toggle && (
                            <li>
                                <div className={styles.subMenu}>
                                    <a
                                        href="/"
                                        className="text text_type_main-small text_color_inactive"
                                    >
                                        Профиль
                                    </a>
                                    <a
                                        href="/"
                                        className="text text_type_main-small text_color_inactive"
                                    >
                                        История заказов
                                    </a>
                                    <a
                                        href="/"
                                        className="text text_type_main-small text_color_inactive"
                                    >
                                        Выход
                                    </a>
                                </div>
                            </li>
                        )}
                        <li className={styles.burgerConstructor}>
                            <a href="/">
                                <div className={styles.textIconContainer}>
                                    <BurgerIcon type="primary" />
                                    <p className="text text_type_main-small">
                                        Конструктор Бургеров
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className={styles.orders}>
                            <a href="/">
                                <div className={styles.textIconContainer}>
                                    <ListIcon type="primary" />
                                    <p className="text text_type_main-small text_color_inactive">
                                        Лента заказов
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className={styles.fullLogoThird}>
                            <a href="/">
                                <div className={styles.textIconContainer}>
                                    <Logo />
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
