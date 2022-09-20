import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { setDetails } from "../../services/ingredient-details-slice";

const IngredientCategory = (props) => {
    const dispatch = useDispatch();

    const handleOpenModal = (ingredient) => {
        dispatch(setDetails(ingredient));
        props.setIsModalOpened(true);
    };

    const { ingredients, loading, error } = useSelector(
        (state) => state.ingredients
    );

    const filteredIngredients = useMemo(
        () =>
            ingredients.filter((ingredient) => ingredient.type === props.type),
        [ingredients]
    );

    return (
        <div>
            <h3 className="text text_type_main-medium">{props.title}</h3>
            <ul className={styles.container}>
                {filteredIngredients.map((ingredient) => {
                    return (
                        <li
                            key={ingredient._id}
                            className={styles.containerElement}
                            onClick={() => {
                                handleOpenModal(ingredient);
                            }}
                        >
                            <div className={styles.containerImage}>
                                <img
                                    src={ingredient.image}
                                    alt={ingredient.name}
                                />
                            </div>
                            <div className={styles.containerPrice}>
                                <p className="text text_type_digits-default">
                                    {ingredient.price}
                                </p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className="text text_type_main-default">
                                {ingredient.name}
                            </p>
                            <Counter count={1} size="default" />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
IngredientCategory.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    setIngredient: PropTypes.func.isRequired,
    setIsModalOpened: PropTypes.func.isRequired,
};
export default IngredientCategory;
