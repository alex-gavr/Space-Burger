import Modal from "../modal/modal";
import styles from './order-details.module.css'
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

export const OrderDetails = ({isOpened, isClosed}) => {

    if (!isOpened) return null;

    return ( 
        <Modal onClick={isClosed} >
            <div className={styles.wrapper}>
                <h1 className="text text_type_digits-large">034536</h1>
                <h3 className="text text_type_main-medium">идентификатор заказа</h3>
                <div className={styles.checkContainer}>
                    <CheckMarkIcon />
                </div>
                <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    );
}
OrderDetails.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    isClosed: PropTypes.func.isRequired
}
