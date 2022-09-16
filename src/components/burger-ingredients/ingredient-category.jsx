import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DataContext } from "../../services/create-context";

const IngredientCategory = (props) => {
    const data = useContext(DataContext);
    const filteredData = useMemo(()=>  data.filter(
        (ingredient) => ingredient.type === props.type
    ),[data]);

    return (
        <div>
            <h3 className="text text_type_main-medium">{props.title}</h3>
            <ul className={styles.container}>
                {filteredData.map((ingredient) => {
                    return (
                        <li
                            key={ingredient._id}
                            className={styles.containerElement}
                            onClick={() => {
                                props.setIngredient(ingredient);
                                props.setIsModalOpened(true);
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
                            {ingredient.__v >= 1 ? (
                                <Counter
                                    count={ingredient.__v}
                                    size="default"
                                />
                            ) : null}
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
