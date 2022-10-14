import BurgerConstructor from "../../burger-constructor/burger-constructor";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import styles from './home.module.css'

const Home = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </div>
        
    );
}
    export default Home;
