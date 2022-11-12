import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { onCloseModal, onOpenModal } from '../../services/modal-slice';
import { deleteOrderDescription, setOrderDescription } from '../../services/order-description-slice';
import { AppDispatch, RootState } from '../../services/store';
import { IOrder, IOrderWithData } from '../../types/data';
import Modal from '../modal/modal';
import OrderInfo from '../order-full-description/order-info';
import styles from './order-card.module.css';
import { UnseenIngredients } from './unseen-ingredients';

interface IProps {
    order: IOrder;
}

// Карточка используется как в ленте так и в истории заказов
const OrderCard: FC<IProps> = ({ order }): JSX.Element => {
    const { ingredients: orderIngredients, number, status, name, createdAt } = order;

    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // расчеты чтобы для изменения zIndex и отображения поверх последнего ингредиента компонент UnseenIngredients
    const arraylength = orderIngredients?.length;
    const maxIngredient = 6;
    const unseenIngredientsNumber = arraylength - maxIngredient;

    const { ingredients } = useSelector((state: RootState) => state.ingredients);

    // Создаю новый массив с нужными данными для отображения инфы в карточке 
    const orderWithData: IOrderWithData[] = orderIngredients.map((id) => {
        const ingredientData = ingredients.filter((ingredient) => id === ingredient._id);
        return {
            id: id,
            name: ingredientData[0].name,
            image: ingredientData[0].image_mobile,
            price: ingredientData[0].price,
        };
    });

    // Считаю тотал
    const price = orderWithData.reduce((acc, ingredient) => acc + ingredient.price, 0);

    // Цветной статус для /profile/orders
    const statusName = status === 'done' ? 'Выполнен' : status === 'pending' ? 'Готовится' : 'Создан';
    const statusClass = status === 'done' ? styles.statusDone : styles.status;

    // Открытие модальки
    const handleOpenModal = (order: IOrder): void => {
        if (location.pathname === '/feed') {
            dispatch(setOrderDescription(order));
            dispatch(onOpenModal(''));
            navigate(`/feed/${order._id}`, { state: { background: location, order: order } });
        } else if (location.pathname === '/profile/orders') {
            dispatch(setOrderDescription(order));
            dispatch(onOpenModal(''));
            navigate(`/profile/orders/${order._id}`, { state: { background: location, order: order } });
        }
    };

    // Закрытие модальки
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
            <div className={styles.card} onClick={() => handleOpenModal(order)}>
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
