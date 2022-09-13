import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ShowData from "./show-data";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const BurgerIngredients = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [ingredient, setIngredient] = useState(void 0);
    const [current, setCurrent] = React.useState("one");

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
                        className={styles.tab}
                        value="one"
                        active={current === "one"}
                        onClick={setCurrent}
                    >
                        Булки
                    </Tab>
                    <Tab
                        value="two"
                        active={current === "two"}
                        onClick={setCurrent}
                    >
                        Соусы
                    </Tab>
                    <Tab
                        value="three"
                        active={current === "three"}
                        onClick={setCurrent}
                    >
                        Начинка
                    </Tab>
                </div>
            </div>
            <div className={styles.sectionsContainer}>
                {/* Контейнер булок */}
                <ShowData
                    title="Булки"
                    type="bun"
                    setIsModalOpened={setIsModalOpened}
                    setIngredient={setIngredient}
                />
                {/* Контейнер соусов */}
                <ShowData
                    title="Соусы"
                    type="sauce"
                    setIsModalOpened={setIsModalOpened}
                    setIngredient={setIngredient}
                />
                {/* Контейнер начинки */}
                <ShowData
                    title="Начинка"
                    type="main"
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
