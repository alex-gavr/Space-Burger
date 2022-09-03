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
                        <div className={styles.container}>
                            <BurgerIcon type='primary' />
                            <p className="text text_type_main-default">Конструктор</p>
                        </div>
                    </button>
                    <button className={styles.button}>
                        <div className={styles.container}>
                            <ListIcon type='primary' />
                            <p className="text text_type_main-default">Лента заказов</p>
                        </div>
                    </button>
                </div>
                <div className={styles.container}>
                    <button>
                        <Logo />
                    </button>
                </div>
                <div className={styles.container}>
                    <button className={styles.button}>
                        <div className={styles.container}>
                            <ProfileIcon type='primary' />
                            <p className="text text_type_main-default">Личный кабинет</p>
                        </div>
                    </button>
                </div>
                
            </nav>
        </header>
    );
}

export default AppHeader;