import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext, useState, useReducer } from "react";
import styles from "./burger-constructor.module.css";
import {
    ConstructorElement,
    Button,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DataContext } from "../../services/create-context";
import { OrderDetails } from "../order-details/order-details";
import Modal from "../modal/modal";
import { useFetch } from "../../utils/hook-fetch";
import { ORDER_URL } from "../../utils/config";
import { INGREDIENT_TYPES } from "../../utils/ingredient-types";
import { v4 as uuidv4 } from 'uuid';

const BurgerConstructor = () => {
    // Беру все ингредиенты из API
    const ingredients = useContext(DataContext);
    // Фильтрую ингредиенты чтобы была только "начинка"
    const mainIngredients = ingredients.filter(
        (ingredient) => ingredient.type === INGREDIENT_TYPES.MAIN
    );
    // Использую начинку как initialState в useReducer
    const initialState = mainIngredients;

    // reducer для useReducer
    const reducer = (state, action) => {
        switch (action.type) {
            case "ADD":
                return [...state, action.ingredient];
            case "DELETE":
                return state.filter(
                    (ingredient) => ingredient._id !== action.payload
                );
            default:
                return state;
        }
    };
    // useReducer
    const [state, dispatch] = useReducer(reducer, initialState);

    // Складываю стоимость ингрединов начинки
    const total = state.reduce((acc, ingredient) => acc + ingredient.price, 0);

    // Считаю общую стоимость с двумя булками
    const totalPrice = total + ingredients[0].price * 2;

    // Функия добавляет новую начинку. Не используется сейчас.
    const addAnotherIngredient = (ingredient) => {
        dispatch({ type: "ADD", ingredient });
    };

    // Функция удаляет начинку
    const deleteIngredient = (ingredient) => {
        dispatch({ type: "DELETE", payload: ingredient._id });
    };

    // IDs начинок для отправки бэкенду
    const mainIngredientsIds = state.map((ingredient) => ingredient._id);
    // Все IDs включая булки для отправки бэкенду
    const allIngredientIds = [
        ingredients[0]._id,
        ...mainIngredientsIds,
        ingredients[0]._id,
    ];

    const { isLoading, isError, data, getData } = useFetch(
        ORDER_URL,
        "POST",
        {
            "Content-Type": "application/json",
        },
        {
            ingredients: allIngredientIds,
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        getData();
        handleOpen();
    };

    // Модуль
    const [isModalOpened, setIsModalOpened] = useState(false);

    const handleClose = () => {
        setIsModalOpened(false);
    };

    const handleOpen = () => {
        setIsModalOpened(true);
    };

    return (
        <section className={styles.wrapper}>
            <ul className={styles.container}>
                {/* Верхняя булка */}
                <li className={`${styles.containerRow} ${styles.paddingRight}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={ingredients[0].name + " (верх)"}
                        price={ingredients[0].price}
                        thumbnail={ingredients[0].image}
                    />
                </li>
                {/* Начинка */}
                <div className={styles.ingredients}>
                    {state.map((ingredient) => {
                        return (
                            <li
                                className={styles.containerRow}
                                key={uuidv4()}
                                onClick={() =>addAnotherIngredient(ingredient)}
                            >
                                <DragIcon />
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    handleClose={() =>
                                        deleteIngredient(ingredient)
                                    }
                                />
                            </li>
                        );
                    })}
                </div>
                {/* Нижняя булка */}
                <li className={`${styles.containerRow} ${styles.paddingRight}`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={ingredients[0].name + " (низ)"}
                        price={ingredients[0].price}
                        thumbnail={ingredients[0].image}
                    />
                </li>
            </ul>
            <div className={styles.containerTotal}>
                <div className={styles.containerRow}>
                    {/* Цена */}
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                {/* Кнопка оформить заказ */}
                <Button type="primary" size="large" onClick={handleSubmit}>
                    Оформить заказ
                </Button>
            </div>
            <Modal isOpened={isModalOpened} onClose={handleClose}>
                <OrderDetails orderNumber={data && data.order.number} />
            </Modal>
        </section>
    );
};

export default BurgerConstructor;
