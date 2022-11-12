import '@ya.praktikum/react-developer-burger-ui-components';
import Cookies from 'js-cookie';
import { useEffect, FC, useRef } from 'react';
import OrderCard from '../../../../components/order-card/order-card';
import { ProfileNavigation } from '../../../../components/profile/profile-navigation/profile-navigation';
import { useAppDispatch, useAppSelector } from '../../../../services/hook';
import { ORDERS_CONNECT_USER, ORDERS_DISCONNECT_USER } from '../../../../services/user-order-history-slice';
import { USER_ORDERS_URL } from '../../../../utils/config';
import styles from './orders.module.css';

const Orders: FC = (): JSX.Element => {
    const fullToken = Cookies.get('accessToken');
    const accessToken = fullToken?.split(' ')[1];

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({ type: ORDERS_CONNECT_USER, payload: `${USER_ORDERS_URL}?token=${accessToken}` });

        return () => {
            dispatch({ type: ORDERS_DISCONNECT_USER });
        };
    }, [dispatch]);

    const { orders } = useAppSelector((state) => state.userOrderHistory);

    return (
        <div className={styles.grid}>
            <ProfileNavigation />
            <div className={styles.feedContainer}>{orders && orders.map((order, index) => <OrderCard key={index} order={order} />)}</div>
        </div>
    );
};

export default Orders;
