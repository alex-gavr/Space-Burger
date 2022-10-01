import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCategory from "./ingredient-category";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { INGREDIENT_TYPES } from "../../utils/ingredient-types";
import { useDispatch } from "react-redux";
import { deleteDetails } from "../../services/ingredient-details-slice";

const BurgerIngredients = () => {
    const dispatch = useDispatch();

    const [isModalOpened, setIsModalOpened] = useState(false);
    const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN);

    const bun = useRef();
    const sauce = useRef();
    const main = useRef();

    const handleClose = () => {
        dispatch(deleteDetails());
        setIsModalOpened(false);
    };

    // TRACKING SCROLLING FOR
    useEffect(() => {
        const element = document.getElementById("id");
        const onScroll = () => {
            const bunHeight = bun.current.clientHeight;
            const sauceHeight = sauce.current.clientHeight;
            const gapHeightBetweenDivs = 40;
            const bunAndSauceAndGap =
                bunHeight + sauceHeight + gapHeightBetweenDivs;

            if (
                element.scrollTop >= bunHeight &&
                element.scrollTop <= bunAndSauceAndGap
            ) {
                setCurrent(INGREDIENT_TYPES.SAUCE);
            } else if (element.scrollTop >= bunAndSauceAndGap) {
                setCurrent(INGREDIENT_TYPES.MAIN);
            } else {
                setCurrent(INGREDIENT_TYPES.BUN);
            }
        };
        element.addEventListener("scroll", onScroll);

        return () => {
            element.removeEventListener("scroll", onScroll);
        };
    }, []);

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
                    >
                        Булки
                    </Tab>
                    <Tab
                        value={INGREDIENT_TYPES.SAUCE}
                        active={current === INGREDIENT_TYPES.SAUCE}
                    >
                        Соусы
                    </Tab>
                    <Tab
                        value={INGREDIENT_TYPES.MAIN}
                        active={current === INGREDIENT_TYPES.MAIN}
                    >
                        Начинка
                    </Tab>
                </div>
            </div>
            <div className={styles.sectionsContainer} id={"id"}>
                {/* Булки */}
                <div ref={bun}>
                    <IngredientCategory
                        title="Булки"
                        type={INGREDIENT_TYPES.BUN}
                        setIsModalOpened={setIsModalOpened}
                    />
                </div>
                {/* Соусы */}
                <div ref={sauce}>
                    <IngredientCategory
                        title="Соусы"
                        type={INGREDIENT_TYPES.SAUCE}
                        setIsModalOpened={setIsModalOpened}
                    />
                </div>
                {/* Начинка */}
                <div ref={main}>
                    <IngredientCategory
                        title="Начинка"
                        type={INGREDIENT_TYPES.MAIN}
                        setIsModalOpened={setIsModalOpened}
                    />
                </div>
            </div>
            <Modal
                title="Детали ингредиента"
                isOpened={isModalOpened}
                onClose={handleClose}
            >
                <IngredientDetails />
            </Modal>
        </section>
    );
};
export default BurgerIngredients;
