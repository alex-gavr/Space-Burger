import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "../../services/ingredient-details-slice";

const Ingredient = ({ ingredient, setIsModalOpened, bun, mainIngredients }) => {
    const dispatch = useDispatch();

    const handleOpenModal = (ingredient) => {
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


    let count = 0;
    if (ingredient.type === 'bun') {
        count = bun.filter(item => item._id === ingredient._id).length *2;
    } else {
        count = mainIngredients.filter(item => item._id === ingredient._id).length;
    }


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
            {count === 0 ?  null : <Counter count={count} size="default" />}
        </li>
    );
};

export default Ingredient;
