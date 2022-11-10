import '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FC } from 'react';
import OrderCard from '../../../../components/feed-order-card/order-card';
import { ProfileNavigation } from '../../../../components/profile-navigation/profile-navigation';
import styles from './orders.module.css';

const Orders: FC = (): JSX.Element => {
    return (
        <div className={styles.grid}>
            <ProfileNavigation />
            <div className={styles.feedContainer}>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </div>
        </div>
    );
};

export default Orders;
