import styles from './order-info.module.css';
import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredients } from './order-ingredient-component/order-ingredients';

const OrderInfo: FC = (): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <p className={`text text_type_main-medium ${styles.orderNumber}`}>#034533</p>
            <p className={`text text_type_main-medium ${styles.orderName}`}>Black Hole Singularity острый бургер</p>
            <p className={`text text_type_main-default ${styles.done}`}>Выполнен</p>
            <p className={`text text_type_main-medium ${styles.orderDescription}`}>Состав: </p>
            <div className={styles.orderContainer}>
                <OrderIngredients />
                <OrderIngredients />
                <OrderIngredients />
                <OrderIngredients />
                <OrderIngredients />
                <OrderIngredients />
            </div>
            <div className={styles.footer}>
                <p className='text text_type_main-default text_color_inactive'>Вчера, 13:50</p>
                <div className={styles.priceContainer}>
                    <p className='text text_type_digits-default'>510</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;
