import { FC } from 'react';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import styles from './home.module.css';

const Home: FC = (): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </div>
    );
};
export default Home;
