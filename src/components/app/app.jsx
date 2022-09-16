import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useFetch } from "../../utils/hook-fetch";
import { Preloader } from "../preloader/preloader";
import { DataContext } from "../../services/create-context";
import { INGREDIENTS_URL } from "../../utils/config";

const App = () => {
    const { isLoading, isError, data, getData } = useFetch(INGREDIENTS_URL);

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {isLoading ? (
                <Preloader />
            ) : (
                    <div className={styles.wrapper}>
                        <AppHeader />
                        <DataContext.Provider value={data.data}>
                        <main className={styles.container}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </main>
                        </DataContext.Provider>
                    </div>
            )}
        </>
    );
};

export default App;
