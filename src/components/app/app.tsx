import '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../header/app-header';
import Home from '../../pages/home/home';
import { Preloader } from '../preloader/preloader';
import { fetchIngredients } from '../../services/ingredients-slice';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';
import Cookies from 'js-cookie';
import { onCloseModal, openModalWithCookie } from '../../services/modal-slice';
import { deleteDetails, setDetails } from '../../services/ingredient-details-slice';
import ProtectedRoutes from '../../utils/private-routes/protected-routes';
import Feed from '../../pages/feed/feed';
import Orders from '../../pages/account/profile/orders/orders';
import OrderInfo from '../order-full-description/order-info';
import { deleteOrderDescription, setOrderDescription } from '../../services/order-description-slice';
import Modal from '../modal/modal';
import { useAppDispatch, useAppSelector } from '../../services/hook';

const App: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { loading } = useAppSelector((state) => state.ingredients);
    const { tokenExpired } = useAppSelector((state) => state.user);
    const token = Cookies.get('accessToken');
    const { orderDescription } = useAppSelector((state) => state.orderDescription);
    const { details } = useAppSelector((state) => state.details);

    const background = location.state?.background;

    useEffect(() => {
        dispatch(fetchIngredients());
        if (token) {
            dispatch(fetchUserData());
        }
    }, [token]);

    useEffect(() => {
        if (tokenExpired) {
            dispatch(tokenUpdate());
        }
    }, [tokenExpired]);

    // Modal Opening Magic After Page Refresh
    const openModal = Cookies.get('isModalOpen');

    useEffect(() => {
        if (openModal && location.state?.ingredient) {
            dispatch(setDetails(location.state.ingredient));
            dispatch(openModalWithCookie('Детали ингредиента'));
        } else if (openModal && location.state?.feed) {
            dispatch(setOrderDescription(location.state.feed));
            dispatch(openModalWithCookie(''));
        } else if (openModal && location.state?.profile) {
            dispatch(setOrderDescription(location.state.profile));
            dispatch(openModalWithCookie(''));
        }
    }, [openModal]);

    const handleCloseModal = (): void => {
        dispatch(onCloseModal());
        dispatch(deleteDetails());
        dispatch(deleteOrderDescription());
        navigate(-1);
    };

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
                            <Route path='/space-burger/' element={<Home />} />
                            <Route path='/' element={<Home />} />
                            <Route path='/ingredients/:id' element={<IngredientDetails />} />
                            <Route path='/feed' element={<Feed />} />
                            <Route path='/feed/:id' element={<OrderInfo />} />
                            <Route element={<ProtectedRoutes />}>
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/profile/orders' element={<Orders />} />
                                <Route path='/profile/orders/:id' element={<OrderInfo />} />
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
                    { orderDescription !== null && (
                        <Modal onClose={handleCloseModal}>
                            <OrderInfo />
                        </Modal>
                    )}
                    { details !== null && (
                        <Modal onClose={handleCloseModal}>
                            <IngredientDetails />
                        </Modal>
                    )}
                </div>
            )}
        </>
    );
};

export default App;
