import '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../../utils/data';

const BurgerConstructor = () => {
    let filteredData = data.filter(o => o.type==="main");
    return(
        <section className={styles.wrapper}>
            <ul className={styles.container}>
                    <li className={styles["container-row"]}>
                        <ConstructorElement type='top' isLocked={true} text={data[0].name} price={data[0].price} thumbnail ={data[0].image}  />
                    </li>
                {
                    filteredData.map((o) => {
                        return(
                            <li className={styles["container-row"]}>
                                <DragIcon />
                                <ConstructorElement text={o.name} price={o.price} thumbnail ={o.image} /> 
                            </li>
                        )
                    })
                }
                <li className={styles["container-row"]}>
                    <ConstructorElement type='bottom' isLocked={true} text={data[0].name} price={data[0].price} thumbnail ={data[0].image}  />
                </li>
            </ul>
                {/* КНОПКА ЗДЕСЬ */}
            <div className={styles["container-total"]}>
                <div className={styles["container-row"]}>
                    <h1 className='text text_type_digits-medium'>610</h1>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" > Оформить заказ </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;