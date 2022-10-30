import '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import Home from '../../pages/home/home';
import { Preloader } from '../preloader/preloader';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/ingredients-slice';
import { Location, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../../pages/registration/login';
import Registration from '../../pages/registration/registration';
import ForgotPassword from '../../pages/registration/forgot-password';
import ResetPassword from '../../pages/registration/password-reset';
import Profile from '../../pages/account/profile/profile';
import NotFound from '../404/not-found';
import { fetchUserData } from '../../services/user-slice';
import LogInRoutes from '../../utils/private-routes/login-routes';
import ResetPasswordProtectionRoute from '../../utils/private-routes/reset-password-protection';
import { tokenUpdate } from '../../services/user-slice';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import Cookies from 'js-cookie';
import { openModalWithCookie } from '../../services/modal-slice';
import { setDetails } from '../../services/ingredient-details-slice';
import ProtectedRoutes from '../../utils/private-routes/protected-routes';
import { AppDispatch, RootState } from '../../types';

const App:FC = ():JSX.Element => {
    const { loading } = useSelector((state: RootState) => state.ingredients);
    const { tokenExpired } = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();
    const location: Location = useLocation();

    const background: Location = location.state?.background;

    useEffect(() => {
        dispatch(fetchIngredients());
        if (token) {
            dispatch(fetchUserData());
        }
    }, []);

    useEffect(() => {
        if (tokenExpired) {
            dispatch(tokenUpdate());
        }
    }, [tokenExpired]);

    // Modal Opening Magic After Page Refresh
    const token = Cookies.get('accessToken');
    const openModal = Cookies.get('isModalOpen');

    useEffect(() => {
        if (openModal) {
            dispatch(setDetails(location.state.ingredient));
            dispatch(openModalWithCookie());
        }
    }, [openModal]);

    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                <div className={styles.wrapper}>
                    <AppHeader />
                    <main>
                        <Routes location={background ?? location}>
                            <Route path='*' element={<NotFound />} />
                            <Route path='/' element={<Home />} />
                            <Route path='/ingredients/:id' element={<IngredientDetails />} />
                            <Route element={<ProtectedRoutes />}>
                                <Route path='/profile' element={<Profile />} />
                            </Route>
                            <Route element={<LogInRoutes />}>
                                <Route path='/login' element={<Login />} />
                                <Route path='/registration' element={<Registration />} />
                                <Route path='/forgot-password' element={<ForgotPassword />} />
                                <Route element={<ResetPasswordProtectionRoute />}>
                                    <Route path='/reset-password' element={<ResetPassword />} />
                                </Route>
                            </Route>
                        </Routes>
                    </main>
                </div>
            )}
        </>
    );
};

export default App;
