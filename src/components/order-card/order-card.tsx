import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteDetails, setDetails } from '../../services/ingredient-details-slice';
import { onCloseModal, onOpenModal } from '../../services/modal-slice';
import { deleteOrderDescription, setOrderDescription } from '../../services/order-description-slice';
import { AppDispatch, RootState } from '../../services/store';
import { IIngredient, IOrder, IOrderWithData } from '../../types/data';
import Modal from '../modal/modal';
import OrderInfo from '../order-full-description/order-info';
import styles from './order-card.module.css';
import { UnseenIngredients } from './unseen-ingredients';

interface IProps {
    order: IOrder;
}

const OrderCard: FC<IProps> = ({ order }): JSX.Element => {
    const { ingredients: orderIngredients, number, status, name, createdAt, updatedAt } = order;

    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const arraylength = orderIngredients?.length;
    const maxIngredient = 6;
    const unseenIngredientsNumber = arraylength - maxIngredient;

    const { ingredients } = useSelector((state: RootState) => state.ingredients);

    // ДЕЛАЮ НОВЫЙ МАССИВ С НУЖНЫМИ ДАННЫМИ
    const orderWithData: IOrderWithData[] = orderIngredients.map((id) => {
        const ingredientData = ingredients.filter((ingredient) => id === ingredient._id);
        return {
            id: id,
            name: ingredientData[0].name,
            image: ingredientData[0].image_mobile,
            price: ingredientData[0].price,
        };
    });

    // СЧИТАЮ ТОТАЛ
    const price = orderWithData.reduce((acc, ingredient) => acc + ingredient.price, 0);

    // Смотрю сколько раз повторяются инргедиенты и записываем в удобном формате
    const result = Object.entries(
        orderIngredients.reduce((acc: any, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {})).map((value: any) => {
        return {
            id: value[0],
            times: value[1],
        };
    });

    // Создаю новый массив со сторочкой сколько раз повторяется ингредиент
    const fullData = orderWithData.map((data) => {
        const ing = result.filter((value: any) => value.id === data.id);
        const timesRepeated = ing[0].times;
        return {
            ...data,
            timesRepeated: timesRepeated,
        };
    });

    // Убираю дубликаты из массива
    const orderDetailsAdjustedForModal = fullData.filter((value, index, self) => index === self.findIndex((t) => t.id === value.id && t.name === value.name));
    console.log(orderDetailsAdjustedForModal);

    // Цветной статус для /profile/orders
    const statusName = status === 'done' ? 'Выполнен' : status === 'pending' ? 'Готовится' : 'Создан';
    const statusClass = status === 'done' ? styles.statusDone : styles.status;

    // TODO: check
    
    // МОДАЛЬКА
    const handleOpenModal = (order: IOrder, orderWithData: IOrderWithData[], price: number): void => {
        const data = {
            order: order,
            filteredIngredients: orderWithData,
            price: price,
        };
        if (location.pathname === '/feed') {
            dispatch(setOrderDescription(data));
            dispatch(onOpenModal(''));
            navigate(`/feed/${order._id}`, { state: { background: location, order: order, filteredIngredients: orderWithData, price: price } });
        } else if (location.pathname === '/profile/orders') {
            dispatch(setOrderDescription(data));
            dispatch(onOpenModal(''));
            navigate(`/profile/orders/${order._id}`, { state: { background: location, order: order, filteredIngredients: orderWithData, price: price } });
        }
    };

    const handleCloseModal = (): void => {
        if (location.pathname === '/feed') {
            dispatch(onCloseModal());
            dispatch(deleteOrderDescription());
            navigate('/feed');
        } else if (location.pathname === `/profile/orders`) {
            dispatch(onCloseModal());
            dispatch(deleteOrderDescription());
            navigate('/profile/orders');
        }
    };

    return (
        <div>
            <div className={styles.card} onClick={() => handleOpenModal(order, orderWithData, price)}>
                <div className={styles.orderInfoContainer}>
                    <p className='text text_type_digits-default'>#{number}</p>
                    <p className='text text_type_main-default text_color_inactive'>
                        {`${new Date(createdAt).toLocaleDateString()} ${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}`}
                    </p>
                </div>
                <div>
                    <p className='text text_type_main-medium'>{name}</p>
                    {location.pathname === '/profile/orders' && <p className={`text text_type_main-default ${statusClass}`}>{statusName}</p>}
                </div>
                <div className={styles.ingredientsAndPriceContainer}>
                    <ul className={styles.ingredientContainer}>
                        {orderWithData &&
                            orderWithData.map((ingredient, index) => {
                                let zIndex = maxIngredient - index;
                                let left = 50 * index;
                                return (
                                    <li key={index} className={styles.ingredient} style={{ zIndex: zIndex, left: left }}>
                                        <img src={ingredient.image} alt='ingredient' />
                                        {zIndex === 0 && <UnseenIngredients unseen={unseenIngredientsNumber} />}
                                    </li>
                                );
                            })}
                    </ul>
                    <div className={styles.priceContainer}>
                        <p className='text text_type_digits-default'>{price}</p>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>
            <Modal onClose={handleCloseModal}>
                <OrderInfo />
            </Modal>
        </div>
    );
};

export default OrderCard;
