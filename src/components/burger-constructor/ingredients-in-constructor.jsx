import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext, useState, useReducer, useEffect } from "react";
import styles from "./burger-constructor.module.css";
import {
    ConstructorElement,
    Button,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { deleteIngredient } from "../../services/constructor-slice";

export const ConstructorIngredients = (ingredient) => {
    const dispatch = useDispatch();

    return (
        <>
            {ingredient.type === "bun" ? (
                <li
                >
                    <ConstructorElement
                        type={ingredient.side}
                        isLocked={true}
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    />
                </li>
            ) : (
                <li
                    className={styles.containerRow}
                >
                    <DragIcon />
                    <ConstructorElement
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={() =>
                            dispatch(deleteIngredient(ingredient))
                        }
                    />
                </li>
            )}
        </>
    );
};
