import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import Ingredient from "./ingredient";

const IngredientCategory = (props) => {
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
                {filteredIngredients &&
                    filteredIngredients.map((ingredient) => {
                        return (
                            <Ingredient
                                ingredient={ingredient}
                                key={ingredient._id}
                                setIsModalOpened={props.setIsModalOpened}
                            />
                        );
                    })}
            </ul>
        </div>
    );
};
IngredientCategory.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    setIsModalOpened: PropTypes.func.isRequired,
};
export default IngredientCategory;
