import '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FC } from 'react';
import OrderCard from '../../components/feed-order-card/order-card';
import OrderInfo from '../../components/order-info/order-info';

import styles from './feed.module.css';

export interface IFeedProps {}

const Feed: FC = (props: IFeedProps) => {
    return (
        <section className={styles.wrapper}>
            <h1 className='text text_type_main-large'>Лента Заказов</h1>
            <div className={styles.columns}>
                <div className={styles.feedContainer}>
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                </div>
                <div className={styles.numbersWrapper}>
                    <div className={styles.highestContainer}>
                        <div className={styles.readyContainer}>
                            <h2 className='text text_type_main-medium'>Готовы:</h2>
                            <ul>
                                <li className='text text_type_digits-default'>034533</li>
                                <li className='text text_type_digits-default'>034533</li>
                                <li className='text text_type_digits-default'>034533</li>
                                <li className='text text_type_digits-default'>034533</li>
                            </ul>
                        </div>
                        <div className={styles.inWorkContainer}>
                            <h2 className='text text_type_main-medium'>В работе:</h2>
                            <ul>
                                <li className='text text_type_digits-default'>034533</li>
                                <li className='text text_type_digits-default'>034533</li>
                                <li className='text text_type_digits-default'>034533</li>
                                <li className='text text_type_digits-default'>034533</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.middleContainer}>
                        <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
                        <p className='text text_type_digits-large'> 28752 </p>
                    </div>
                    <div className={styles.lowestContainer}>
                        <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
                        <p className='text text_type_digits-large'>138</p>
                    </div>
                </div>
            </div>
            <OrderInfo />
        </section>
    );
};
export default Feed;
