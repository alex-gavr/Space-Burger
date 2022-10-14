import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect } from "react";
import styles from "./burger-constructor.module.css";
import {
    Button,
    CurrencyIcon,
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderDetails } from "../order-details/order-details";
import Modal from "../modal/modal";
import { INGREDIENT_TYPES } from "../../utils/ingredient-types";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrderDetails, fetchOrderDetails } from "../../services/order-details-slice";
import { useDrop } from "react-dnd";
import { addIngredient, emptyConstructor } from "../../services/constructor-slice";
import Card from "./card";
import { deleteIngredient } from "../../services/constructor-slice";
import { useNavigate } from "react-router-dom";
import { openModalOrder } from "../../services/modal-slice";
import { onCloseModal } from "../../services/modal-slice";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bun, mainIngredients } = useSelector(
        (state) => state.burgerConstructor
    );
    const { orderDetails } = useSelector((state) => state.orderDetails);
    const {loginSuccess} = useSelector((state) => state.user);

    // Считаем Тотал
    const totalMainIngredients = mainIngredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
    );

    const totalBuns = bun.reduce((acc, bun) => acc + bun.price, 0) * 2;
    const totalPrice = totalMainIngredients + totalBuns;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loginSuccess) {
            // Айдишички для Поста считаем только при клике "оформить заказ"
            const mainIngredientsIds = mainIngredients.map(
                (ingredient) => ingredient._id
            );
            const bunsIds = bun.map((ingredient) => ingredient._id);
            const allIngredientIds = [
                ...bunsIds,
                ...mainIngredientsIds,
                ...bunsIds,
            ];
            dispatch(fetchOrderDetails(allIngredientIds));
        } else{
            navigate('/login');
        }
    };

    const handleCloseModal = () => {
        dispatch(onCloseModal());
        // delete order details
        dispatch(deleteOrderDetails());
        // delete ingredients from constructor
        dispatch(emptyConstructor());
    }

    useEffect(() => {
        if (orderDetails.success && loginSuccess) {
            dispatch(openModalOrder());
        }
    }, [orderDetails, loginSuccess]);

    // DND
    const [{ canDrop }, drop] = useDrop(() => ({
        accept: "ingredient",
        drop: (ingredient) => {
            dispatch(addIngredient(ingredient.ingredient));
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <section className={styles.wrapper}>
            <ul
                ref={drop}
                className={`${styles.container} ${
                    canDrop ? styles.canDrop : null
                }`}
            >
                {/* ВЕРХНЯЯ БУЛКА */}
                <div className={styles.paddingRight}>
                    {bun &&
                        bun.map((ingredient, index) => (
                            <li key={index}>
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={ingredient.name + " (верх)"}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                />
                            </li>
                        ))}
                </div>
                {/* ОСНОВНЫЕ ИНГРЕДИЕНТЫ */}
                <div className={styles.ingredients}>
                    {mainIngredients &&
                        mainIngredients.map((ingredient, index) => (
                            <li className={styles.containerRow} key={index}>
                                <Card
                                    key={ingredient._id}
                                    id={ingredient._id}
                                    index={index}
                                >
                                    <DragIcon />
                                    <ConstructorElement
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                        handleClose={() =>
                                            dispatch(
                                                deleteIngredient(ingredient)
                                            )
                                        }
                                    />
                                </Card>
                            </li>
                        ))}
                </div>
                {/* НИЖНЯЯ БУЛКА */}
                <div className={styles.paddingRight}>
                    {bun &&
                        bun.map((ingredient, index) => (
                            <li key={index}>
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={ingredient.name + " (низ)"}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                />
                            </li>
                        ))}
                </div>
            </ul>
            <div className={styles.containerTotal}>
                <div className={styles.containerRow}>
                    {/* Цена */}
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                {/* Кнопка оформить заказ */}
                <Button type="primary" size="large" onClick={handleSubmit} disabled={bun.length === 0 || mainIngredients.length === 0  ? true: false}>
                    Оформить заказ
                </Button>
            </div>
            {orderDetails.success && loginSuccess && (
                <Modal onClose={handleCloseModal}>
                    <OrderDetails orderNumber={orderDetails.order.number} />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;
