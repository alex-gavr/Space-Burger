import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const OrderDetails = ({ orderNumber }) => {
    return (
        <div className={styles.wrapper}>
            <h1 className='text text_type_digits-large'>{orderNumber}</h1>
            <h3 className='text text_type_main-medium'>идентификатор заказа</h3>
            <div className={styles.checkContainer}>
                <CheckMarkIcon />
            </div>
            <p className='text text_type_main-small mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-small text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};
OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired,
};
