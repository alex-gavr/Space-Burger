import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCategory from "./ingredient-category";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { INGREDIENT_TYPES } from "../../utils/ingredient-types";

const BurgerIngredients = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [ingredient, setIngredient] = useState(void 0);
    const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN);

    const handleClose = () => {
        setIsModalOpened(false);
    };

    return (
        <section className={styles.wrapper}>
            <div className="mt-10">
                <h1 className="text text_type_main-large mb-5">
                    Собери бургер
                </h1>
                <div className={styles.containerTabs}>
                    <Tab
                        value={INGREDIENT_TYPES.BUN}
                        active={current === INGREDIENT_TYPES.BUN}
                        onClick={setCurrent}
                    >
                        Булки
                    </Tab>
                    <Tab
                        value={INGREDIENT_TYPES.SAUCE}
                        active={current === INGREDIENT_TYPES.SAUCE}
                        onClick={setCurrent}
                    >
                        Соусы
                    </Tab>
                    <Tab
                        value={INGREDIENT_TYPES.MAIN}
                        active={current === INGREDIENT_TYPES.MAIN}
                        onClick={setCurrent}
                    >
                        Начинка
                    </Tab>
                </div>
            </div>
            <div className={styles.sectionsContainer}>
                {/* Булки */}
                <IngredientCategory
                    title="Булки"
                    type={INGREDIENT_TYPES.BUN}
                    setIsModalOpened={setIsModalOpened}
                    setIngredient={setIngredient}
                />
                {/* Соусы */}
                <IngredientCategory
                    title="Соусы"
                    type={INGREDIENT_TYPES.SAUCE}
                    setIsModalOpened={setIsModalOpened}
                    setIngredient={setIngredient}
                />
                {/* Начинка */}
                <IngredientCategory
                    title="Начинка"
                    type={INGREDIENT_TYPES.MAIN}
                    setIsModalOpened={setIsModalOpened}
                    setIngredient={setIngredient}
                />
            </div>
            <Modal
                title="Детали ингредиента"
                isOpened={isModalOpened}
                onClose={handleClose}
            >
                <IngredientDetails ingredient={ingredient} />
            </Modal>
        </section>
    );
};
export default BurgerIngredients;
