import '@ya.praktikum/react-developer-burger-ui-components';
import React, {useContext} from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../../utils/create-context';



const BurgerConstructor = () => {
    const data = useContext(DataContext);
    const filteredData = data.filter(ingredient => ingredient.type==="main");
    return(
        <section className={styles.wrapper}>
            <ul className={styles.container}>
                    <li className={`${styles["container-row"]} ${styles["padding-right"]}`}>
                        <ConstructorElement type='top' isLocked={true} text={data[0].name + " (верх)"} price={data[0].price} thumbnail ={data[0].image} />
                    </li>
                    <div className={styles.ingredients}>
                        {
                            filteredData.map((ingredient) => {
                                return(
                                    <li className={styles["container-row"]} key={ingredient._id}>
                                        <DragIcon />
                                        <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail ={ingredient.image} /> 
                                    </li>
                                )
                            })
                        }
                    </div>
                <li className={`${styles["container-row"]} ${styles["padding-right"]}`}>
                    <ConstructorElement type='bottom' isLocked={true} text={data[0].name + ' (низ)'} price={data[0].price} thumbnail ={data[0].image}  />
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