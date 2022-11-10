import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import styles from './order-ingredients.module.css';

export const OrderIngredients: FC = (): JSX.Element => {
    const { ingredients } = useSelector((state: RootState) => state.ingredients);

    return (
        <>
            {ingredients && (
                <div className={styles.ingredient}>
                    <div className={styles.imageContainer}>
                        <img src={ingredients[0]?.image_mobile} alt='ingredient' />
                    </div>
                    <p className='text text_type_main-default'>{ingredients[0]?.name}</p>
                    <div className={styles.priceContainer}>
                        <p className='text text_type_digits-default'> 2 x {ingredients[0]?.price}</p>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            )}
        </>
    );
};
