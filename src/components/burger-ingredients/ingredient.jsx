import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { addIngredient } from "../../services/constructor-slice";
import { setDetails } from "../../services/ingredient-details-slice";

const Ingredient = ({ ingredient, setIsModalOpened }) => {
    const dispatch = useDispatch();

    const handleOpenModal = (ingredient) => {
        // dispatch(addIngredient(ingredient));
        dispatch(setDetails(ingredient));
        setIsModalOpened(true);
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ingredient",
        item: {ingredient : ingredient},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    console.log(isDragging ? ingredient : "no");

    return (
        <li
            className={styles.containerElement}
            onClick={() => handleOpenModal(ingredient)}
            ref={drag}
        >
            <div className={styles.containerImage}>
                <img src={ingredient.image} alt={ingredient.name} />
            </div>
            <div className={styles.containerPrice}>
                <p className="text text_type_digits-default">
                    {ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
            <Counter count={1} size="default" />
        </li>
    );
};

export default Ingredient;
