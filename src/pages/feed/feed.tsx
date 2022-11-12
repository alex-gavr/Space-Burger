import '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import OrderCard from '../../components/order-card/order-card';
import styles from './feed.module.css';
import { Preloader } from '../../components/preloader/preloader';
import { useAppSelector } from '../../services/hook';

const Feed: FC = () => {
    const { orders, total, totalToday } = useAppSelector((state) => state.feedOrders);

    const completedOrders = orders.filter((orders) => orders.status === 'done');
    const inProgressOrders = orders.filter((orders) => orders.status === 'pending');

    return (
        <>
            {orders.length > 0 ? (
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
                                <p className='text text_type_digits-large'> {total} </p>
                            </div>
                            <div className={styles.lowestContainer}>
                                <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
                                <p className='text text_type_digits-large'>{totalToday}</p>
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
