import styles from './preloader.module.css';
import logo from '../../images/logo-only-burger.svg';

export const PreloaderSmall = () => {
    return (
        <div className={styles.containerSmall}>
            <img src={logo} alt='Логотип Бургерной' className={styles.logoSmall} />
        </div>
    );
};