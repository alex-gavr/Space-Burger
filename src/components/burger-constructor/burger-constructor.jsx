import "@ya.praktikum/react-developer-burger-ui-components";
import React, {
    useContext,
    useState,
    useReducer,
    useEffect,
    useMemo,
    useCallback,
} from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { ConstructorIngredients } from "./ingredients-in-constructor";
import { v4 as uuidv4 } from "uuid";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchOrderDetails } from "../../services/order-details-slice";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../services/constructor-slice";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { constructorItems } = useSelector(
        (state) => state.burgerConstructor
    );
    const { orderDetails } = useSelector((state) => state.orderDetails);

    // Булочка
    const bun = constructorItems.filter(
        (ingredient) => ingredient.type === INGREDIENT_TYPES.BUN
    );

    // Основные Ингредиенты
    const ingredients = constructorItems.filter(
        (ingredient) => ingredient.type !== INGREDIENT_TYPES.BUN
    );

    // Считаем Тотал
    const totalIngredients = ingredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
    );

    const totalBuns = bun.reduce((acc, bun) => acc + bun.price, 0) * 2;
    const totalPrice = totalIngredients + totalBuns;

    // Айдишички для Поста
    const mainIngredientsIds = ingredients.map((ingredient) => ingredient._id);
    const bunsIds = bun.map((ingredient) => ingredient._id);
    const allIngredientIds = [...bunsIds, ...mainIngredientsIds, ...bunsIds];

    console.log(allIngredientIds);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchOrderDetails(allIngredientIds));
    };

    console.log(orderDetails);

    useEffect(() => {
        if (orderDetails.success) {
            handleOpen();
        }
    }, [orderDetails]);

    // Модуль
    const [isModalOpened, setIsModalOpened] = useState(false);

    const handleClose = () => {
        setIsModalOpened(false);
    };

    const handleOpen = () => {
        setIsModalOpened(true);
    };

    // DND

    const [{isOver}, drop] = useDrop (() => ({
        accept: 'ingredient',
        drop: (ingredient) => {
            console.log(ingredient);
            dispatch(addIngredient(ingredient.ingredient))
        },
    }))

    return (
        <section className={styles.wrapper}>
            <ul className={styles.container} ref={drop}>
                {/* ВЕРХЯЯ БУЛКА */}
                <div className={styles.paddingRight}>
                    {bun &&
                        bun.map((ingredient) => (
                            <ConstructorIngredients
                                side="top"
                                {...ingredient}
                                key={uuidv4()}
                            />
                        ))}
                </div>
                {/* ОСНОВНЫЕ ИНГРЕДИЕНТЫ */}
                <div className={styles.ingredients}>
                    {ingredients &&
                        ingredients.map((ingredient) => (
                            <ConstructorIngredients
                                {...ingredient}
                                key={uuidv4()}
                            />
                        ))}
                </div>
                {/* НИЖНЯЯ БУЛКА */}
                <div className={styles.paddingRight}>
                    {bun &&
                        bun.map((ingredient) => (
                            <ConstructorIngredients
                                side="bottom"
                                {...ingredient}
                                key={uuidv4()}
                            />
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
                <Button type="primary" size="large" onClick={handleSubmit}>
                    Оформить заказ
                </Button>
            </div>
            {orderDetails.success && (
                <Modal isOpened={isModalOpened} onClose={handleClose}>
                    <OrderDetails orderNumber={orderDetails.order.number} />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;
