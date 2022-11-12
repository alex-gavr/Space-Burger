import '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import OrderCard from '../../components/order-card/order-card';
import styles from './feed.module.css';
import { Preloader } from '../../components/preloader/preloader';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import { ORDERS_CONNECT, ORDERS_DISCONNECT } from '../../services/feed-orders-slice';
import { FEED_ORDERS_URL } from '../../utils/config';

const Feed: FC = () => {
    const dispatch = useAppDispatch();
    const { data, orders } = useAppSelector((state) => state.feedOrders);

    useEffect(() => {
        dispatch({ type: ORDERS_CONNECT, payload: FEED_ORDERS_URL });

        return () => {
            dispatch({ type: ORDERS_DISCONNECT});
        };
    }, [dispatch]);

    const completedOrders = orders.filter((orders) => orders.status === 'done');
    const inProgressOrders = orders.filter((orders) => orders.status === 'pending');

    return (
        <>
            {data && orders ? (
                <section className={styles.wrapper}>
                    <h1 className='text text_type_main-large'>Лента Заказов</h1>
                    <div className={styles.columns}>
                        <div className={styles.feedContainer}>
                            {orders.map((order, index) => (
                                <OrderCard key={index} order={order} />
                            ))}
                        </div>
                        <div className={styles.numbersWrapper}>
                            <div className={styles.highestContainer}>
                                <div className={styles.readyContainer}>
                                    <h2 className='text text_type_main-medium'>Готовы:</h2>
                                    <ul>
                                        {completedOrders.map((order, index) => (
                                            <li className='text text_type_digits-default' key={index}>
                                                {order.number}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.inWorkContainer}>
                                    <h2 className='text text_type_main-medium'>В работе:</h2>
                                    <ul>
                                        {inProgressOrders.map((order, index) => (
                                            <li className='text text_type_digits-default' key={index}>
                                                {order.number}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.middleContainer}>
                                <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
                                <p className='text text_type_digits-large'> {data?.total} </p>
                            </div>
                            <div className={styles.lowestContainer}>
                                <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
                                <p className='text text_type_digits-large'>{data?.totalToday}</p>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <Preloader />
            )}
        </>
    );
};

export default Feed;
