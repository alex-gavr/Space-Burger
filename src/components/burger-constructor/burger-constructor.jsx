import '@ya.praktikum/react-developer-burger-ui-components';
import React, {useContext, useState, useReducer} from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../../utils/create-context';
import { OrderDetails } from '../order-details/order-details';
import Modal from '../modal/modal';


const BurgerConstructor = () => {
    // Беру все ингредиенты из API
    const ingredients = useContext(DataContext);
    // Фильтрую ингредиенты чтобы была только "начинка"
    const mainIngredients = ingredients.filter(ingredient => ingredient.type==="main");
    // Использую начинку как initialState в useReducer
    const initialState = mainIngredients;

    // reducer для useReducer
    const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.ingredient];
        case "DELETE":
            return state.filter((ingredient) => ingredient._id !== action.payload)
        default:
            return state;
    }
}
    // useReducer
    const [state, dispatch] = useReducer(reducer, initialState);

    // Складываю стоимость ингрединов начинки
    const total = state.reduce((acc, ingredient) => acc + ingredient.price, 0);
    // Считаю общую стоимость с двумя булками
    const totalPrice = total + ingredients[0].price*2;

    // Функия добавляет новую начинку. Не используется сейчас.
    const addAnotherIngredient = (ingredient) => {
        dispatch({type: "ADD", ingredient});
    }  
    // Функция удаляет начинку
    const deleteIngredient = (ingredient) => {
        console.log(ingredient);
        dispatch({type: "DELETE", payload: ingredient._id});
    }

    const [isModalOpened, setIsModalOpened] = useState(false);

    const handleClose = () => {
        setIsModalOpened(false)
    }

    
    return(
        <section className={styles.wrapper}>
            <ul className={styles.container}>
                    {/* Верхняя булка */}
                    <li className={`${styles["container-row"]} ${styles["padding-right"]}`}>
                        <ConstructorElement type='top' isLocked={true} text={ingredients[0].name + " (верх)"} price={ingredients[0].price} thumbnail ={ingredients[0].image} />
                    </li>
                    {/* Начинка */}
                    <div className={styles.ingredients}>
                        {
                            state.map((ingredient) => {
                                return(
                                    <li className={styles["container-row"]} key={ingredient._id} onClick={() => deleteIngredient(ingredient)} >
                                        <DragIcon />
                                        <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail ={ingredient.image}  /> 
                                    </li>
                                )
                            })
                        }
                    </div>
                    {/* Нижняя булка */}
                <li className={`${styles["container-row"]} ${styles["padding-right"]}`}>
                    <ConstructorElement type='bottom' isLocked={true} text={ingredients[0].name + ' (низ)'} price={ingredients[0].price} thumbnail ={ingredients[0].image}  />
                </li>
            </ul>
            <div className={styles["container-total"]}>
                <div className={styles["container-row"]}>
                    {/* Цена */}
                    <h1 className='text text_type_digits-medium'>{totalPrice}</h1>
                    <CurrencyIcon type="primary" />
                </div>
                {/* Кнопка оформить заказ */}
                <Button type="primary" size="large" onClick={() => setIsModalOpened(true)} > Оформить заказ </Button>
            </div>
            <Modal isOpened={isModalOpened} onClose={handleClose} >
                <OrderDetails />
            </Modal>
            
        </section>
    )
}

export default BurgerConstructor;