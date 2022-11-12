import '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useRef } from 'react';
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
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';
import Cookies from 'js-cookie';
import { openModalWithCookie } from '../../services/modal-slice';
import { setDetails } from '../../services/ingredient-details-slice';
import ProtectedRoutes from '../../utils/private-routes/protected-routes';
import { AppDispatch, RootState } from '../../services/store';
import Feed from '../../pages/feed/feed';
import Orders from '../../pages/account/profile/orders/orders';
import OrderInfo from '../order-full-description/order-info';
import { FEED_ORDERS_URL } from '../../utils/config';
import { onCloseWSFeed, onErrorWSFeed, onMessageWSFeed, onOpenWSFeed } from '../../services/feed-orders-slice';
import { setOrderDescription } from '../../services/order-description-slice';

const App: FC = (): JSX.Element => {
    const { loading } = useSelector((state: RootState) => state.ingredients);
    const { tokenExpired } = useSelector((state: RootState) => state.user);
    const token = Cookies.get('accessToken');
    const dispatch: AppDispatch = useDispatch();
    const location: Location = useLocation();

    const background = location.state?.background;

    useEffect(() => {
        dispatch(fetchIngredients());
        if (token) {
            dispatch(fetchUserData());
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (tokenExpired) {
            dispatch(tokenUpdate());
        }
    }, [tokenExpired, dispatch]);

    // Modal Opening Magic After Page Refresh
    const openModal = Cookies.get('isModalOpen');

    useEffect(() => {
        if (openModal && location.state?.ingredient) {
            dispatch(setDetails(location.state.ingredient));
            dispatch(openModalWithCookie('Детали ингредиента'));
        } else if (openModal && location.state?.order) {
            dispatch(setOrderDescription(location.state.order));
            dispatch(openModalWithCookie(''));
        }
    }, [openModal, dispatch, location.state]);

    //  SOCKET для ленты. Открываю соединение здесь, чтобы если кто-то перешёл по ссылку на заказ, данные могли отобразиться, иначе не отображаются...
    let socketFeed: any = useRef();

    useEffect(() => {
        socketFeed.current = new WebSocket(FEED_ORDERS_URL);
        socketFeed.current.onopen = (event: Event) => {
            dispatch(onOpenWSFeed(event.type));
        };
        socketFeed.current.onmessage = (event: MessageEvent) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch(onMessageWSFeed(parsedData));
        };
        socketFeed.current.onclose = (event: CloseEvent) => {
            if (event.wasClean) {
                dispatch(onCloseWSFeed(event.type));
            } else if (!event.wasClean) {
                dispatch(onErrorWSFeed(event));
            }
        };
        socketFeed.current.onerror = (event: Error) => {
            dispatch(onErrorWSFeed(event));
        };
    }, [dispatch]);

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
                            <Route path='/feed' element={<Feed />} />
                            <Route path='/feed/:id' element={<OrderInfo />} />
                            <Route path='/ingredients/:id' element={<IngredientDetails />} />
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
                </div>
            )}
        </>
    );
};

export default App;
