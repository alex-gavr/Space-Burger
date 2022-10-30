import styles from './preloader.module.css';
import logo from '../../images/logo-only-burger.svg';
import { FC } from 'react';

export const PreloaderSmall: FC = (): JSX.Element => {
    return (
        <div className={styles.containerSmall}>
            <img src={logo} alt='Логотип Бургерной' className={styles.logoSmall} />
        </div>
    );
};