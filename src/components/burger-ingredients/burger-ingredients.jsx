import '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ShowData from './show-data';
import { IngredientDetails } from '../ingredient-details/ingredient-details';


const BurgerIngredients = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [id, setId] = useState(void 0);
    const [current, setCurrent] = React.useState('one')

    const handleClose = () => {
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
                <ShowData heading="Булки" type="bun" setIsModalOpened={setIsModalOpened} setId={setId}  />
                {/* Контейнер соусов */}
                <ShowData heading="Соусы" type="sauce" setIsModalOpened={setIsModalOpened} setId={setId} />
                {/* Контейнер начинки */}
                <ShowData heading="Начинка" type="main" setIsModalOpened={setIsModalOpened} setId={setId} />
            </div>
            <IngredientDetails isOpened={isModalOpened} isClosed={handleClose} id={id} />
            
        </section>
    )
}
export default BurgerIngredients;