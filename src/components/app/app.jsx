import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../header/app-header";
import Home from "../home/home";
import { Preloader } from "../preloader/preloader";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/ingredients-slice";
import { Route, Routes } from "react-router-dom";
import Login from "../registration/login";
import Registration from "../registration/registration";
import ForgotPassword from "../registration/forgot-password";
import ResetPassword from "../registration/password-reset";
import Profile from "../account/profile/profile";
import NotFound from "../404/not-found";

const App = () => {
    const {loading} = useSelector((state) => state.ingredients);

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
                        <main>
                            <Routes>
                                <Route path='*' element={<NotFound />} />
                                <Route path="/" element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/registration" element={<Registration />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/reset-password" element={<ResetPassword />} />
                            </Routes>
                            
                        </main>
                    </div>
            )}
        </>
    );
};

export default App;
