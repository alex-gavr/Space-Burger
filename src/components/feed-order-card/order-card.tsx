import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import styles from './order-card.module.css';
import { UnseenIngredients } from './unseen-ingredients';

const OrderCard: FC = (): JSX.Element => {
    const { ingredients } = useSelector((state: RootState) => state.ingredients);

    const arraylength = ingredients.length;
    const maxIngredient = 6;
    const unseenIngredientsNumber = arraylength - maxIngredient;


    return (
        <div>
            <div className={styles.card}>
                <div className={styles.orderInfoContainer}>
                    <p className='text text_type_digits-default'>#034535</p>
                    <p className='text text_type_main-default text_color_inactive'>Сегодня, 16:20</p>
                </div>
                <p className='text text_type_main-medium'>Death Start Starship Main Burger</p>
                <div className={styles.ingredientsAndPriceContainer}>
                    <ul className={styles.ingredientContainer}>
                        {ingredients && ingredients.map((ingredient, index) => {
                            let zIndex = maxIngredient - index;
                            let left = 50 * index;
                            return (
                                <li key={index} className={styles.ingredient} style={{ zIndex: zIndex, left: left }}>
                                    {zIndex === 0 && <UnseenIngredients unseen={unseenIngredientsNumber} />}
                                    <img src={ingredient.image_mobile} alt='ingredient' />
                                </li>
                            );
                        })}
                    </ul>
                    <div className={styles.priceContainer}>
                        <p className='text text_type_digits-default'>480</p>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
