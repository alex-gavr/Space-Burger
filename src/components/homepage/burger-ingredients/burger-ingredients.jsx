import '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ShowData from './show-data';

const BurgerIngredients = () => {

    const [current, setCurrent] = React.useState('one')
    return(
        <section className={styles.wrapper}>
            <div className="mt-10">
                <h1 className="text text_type_main-large mb-5">Собери бургер</h1>
                <div className={styles["container-tabs"]}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
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
                <ShowData heading="Булки" type="bun" />
                {/* Контейнер соусов */}
                <ShowData heading="Соусы" type="sauce" />
                {/* Контейнер начинки */}
                <ShowData heading="Начинка" type="main" />
            </div>
            
        </section>
    )
}
export default BurgerIngredients;