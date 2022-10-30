import React, { FC } from 'react';
import styles from './preloader.module.css';
import logo from '../../images/logo-only-burger.svg';

export const Preloader:FC = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.logContainer}>
                <img src={logo} alt='Логотип Бургерной' className={styles.logo} />
                <h1 className='text text_type_main-default'>Загрузка сайта</h1>
            </div>
        </div>
    );
};
