import '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useRef } from 'react';
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
import { FEED_ORDERS_URL } from '../../utils/config';
import { onCloseWSFeed, onErrorWSFeed, onMessageWSFeed, onOpenWSFeed } from '../../services/feed-orders-slice';
import { deleteOrderDescription, setOrderDescription } from '../../services/order-description-slice';
import Modal from '../modal/modal';
import { useAppDispatch, useAppSelector } from '../../services/hook';

const App: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch= useAppDispatch();
    const location = useLocation();
    const { loading } = useAppSelector((state) => state.ingredients);
    const { tokenExpired } = useAppSelector((state) => state.user);
    const token = Cookies.get('accessToken');

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

    const handleCloseModal = (): void => {
        dispatch(onCloseModal());
        dispatch(deleteDetails());
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
                    <Modal onClose={handleCloseModal}>
                        {location.state?.ingredient && <IngredientDetails />}
                        {location.state?.order && <OrderInfo />}
                    </Modal>
                </div>
            )}
        </>
    );
};

export default App;
