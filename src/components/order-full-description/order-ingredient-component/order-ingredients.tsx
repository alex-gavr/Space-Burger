import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './order-ingredients.module.css';

interface IProps {
    image_mobile: string;
    name: string;
    price: number;
}

export const OrderIngredients: FC<IProps> = ({ image_mobile, name, price }): JSX.Element => {
    return (
        <div className={styles.ingredient}>
            <div className={styles.imageContainer}>
                <img src={image_mobile} alt='ingredient' />
            </div>
            <p className='text text_type_main-default'>{name}</p>
            <div className={styles.priceContainer}>
                <p className='text text_type_digits-default'> 2 x {price}</p>
                <CurrencyIcon type='primary' />
            </div>
        </div>
    );
};
