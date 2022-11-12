import '@ya.praktikum/react-developer-burger-ui-components';
import Cookies from 'js-cookie';
import { useEffect, FC, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderCard from '../../../../components/order-card/order-card';
import { ProfileNavigation } from '../../../../components/profile/profile-navigation/profile-navigation';
import { AppDispatch, RootState } from '../../../../services/store';
import { onCloseWSUser, onErrorWSUser, onMessageWSUser, onOpenWSUser } from '../../../../services/user-order-history-slice';
import { USER_ORDERS_URL } from '../../../../utils/config';
import styles from './orders.module.css';

const Orders: FC = (): JSX.Element => {
    const fullToken = Cookies.get('accessToken');
    const accessToken = fullToken?.split(' ')[1];

    const dispatch: AppDispatch = useDispatch();

    // Запускаю Socket через useRef чтобы в целом была возможность вызывать dispatch на socket в функциях (допустим по нажатию кнопки прекртить соединение)
    let socket: any = useRef();

    useEffect(() => {
        socket.current = new WebSocket(`${USER_ORDERS_URL}?token=${accessToken}`);
        socket.current.onopen = (event: Event) => {
            dispatch(onOpenWSUser(event.type));
        };
        socket.current.onmessage = (event: MessageEvent) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch(onMessageWSUser(parsedData));
        };
        socket.current.onclose = (event: CloseEvent) => {
            if (event.wasClean) {
                dispatch(onCloseWSUser(event.type));
            } else if (!event.wasClean) {
                dispatch(onErrorWSUser(event));
            }
        };
        socket.current.onerror = (event: Error) => {
            dispatch(onErrorWSUser(event));
        };
    }, [dispatch, accessToken]);

    const { orders } = useSelector((state: RootState) => state.userOrderHistory);

    return (
        <div className={styles.grid}>
            <ProfileNavigation />
            <div className={styles.feedContainer}>{orders && orders.map((order, index) => <OrderCard key={index} order={order} />)}</div>
        </div>
    );
};

export default Orders;
