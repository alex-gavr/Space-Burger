import '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const AppHeader = () => {

    return (
        <header>
            <nav>
                <div className={styles.container}>
                    <button className={styles.button}>
                        <div className={styles.containerInnerButton}>
                            <BurgerIcon type='primary' />
                            <p className="text text_type_main-small">Конструктор</p>
                        </div>
                    </button>
                    <button className={styles.button}>
                        <div className={styles.containerInnerButton}>
                            <ListIcon type='primary' />
                            <p className="text text_type_main-small text_color_inactive">Лента заказов</p>
                        </div>
                    </button>
                </div>
                <div className={[styles.container, styles.logo].join(' ')}  >
                    <button>
                        <Logo />
                    </button>
                </div>
                <div className={styles.container}>
                    <button className={styles.button}>
                        <div className={styles.containerInnerButton}>
                            <ProfileIcon type='primary' />
                            <p className="text text_type_main-small text_color_inactive">Личный кабинет</p>
                        </div>
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;