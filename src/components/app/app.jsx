import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { Preloader } from "../preloader/preloader";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/ingredients-slice";

const App = () => {
    const {ingredients, loading, error} = useSelector((state) => state.ingredients);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, []);

    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                    <div className={styles.wrapper}>
                        <AppHeader />
                        <main className={styles.container}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </main>
                    </div>
            )}
        </>
    );
};

export default App;
