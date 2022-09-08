import '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ShowData from './show-data';
import { IngredientDetails } from '../ingredient-details/ingredient-details';


const BurgerIngredients = (props) => {
    const [isModalOpened, setIsModalOpened] = useState(false);

    const [current, setCurrent] = React.useState('one')

    const handleClose = (e) => {
        setIsModalOpened(false)
    }

    return(
        <section className={styles.wrapper}>
            <div className="mt-10">
                <h1 className="text text_type_main-large mb-5">Собери бургер</h1>
                <div className={styles["container-tabs"]}>
                    <Tab className={styles.tab} value="one" active={current === 'one'} onClick={(setCurrent)}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Начинка
                    </Tab>
                </div>
            </div>
            <div className={styles["sections-container"]}>
                {/* Контейнер булок */}
                <ShowData heading="Булки" type="bun" stateChanger={setIsModalOpened} />
                {/* Контейнер соусов */}
                <ShowData heading="Соусы" type="sauce" stateChanger={setIsModalOpened} />
                {/* Контейнер начинки */}
                <ShowData heading="Начинка" type="main" stateChanger={setIsModalOpened} />
            </div>
            <IngredientDetails isOpened={isModalOpened} isClosed={handleClose} />
            
        </section>
    )
}
export default BurgerIngredients;