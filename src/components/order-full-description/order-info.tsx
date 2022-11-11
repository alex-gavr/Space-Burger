import styles from './order-info.module.css';
import { FC, useEffect, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredients } from './order-ingredient-component/order-ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { useParams } from 'react-router-dom';
import { setOrderDescription } from '../../services/order-description-slice';
import { Preloader } from '../preloader/preloader';

const OrderInfo: FC = (): JSX.Element => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const { ingredients } = useSelector((state: RootState) => state.ingredients);

    // ДАННЫЕ О ЗАКАЗЕ ПЕРЕДАННЫЕ В РЕДАКС
    const { orderDescription } = useSelector((state: RootState) => state.orderDescription);
    // ДАННЫЕ ВСЕХ ЗАКАЗОВ В ЛЕНТЕ
    const { orders } = useSelector((state: RootState) => state.feedOrders);

    // ИЩЕМ ЗАКАЗ В ЛЕНТЕ ЗАКАЗОВ
    const order = useMemo(() => orders?.filter((order) => order._id === id), [orders, id]);

    // ВОЗВРАЩАЕМ НУЖНЫЕ ИНГРЕДИЕНТЫ ЧТОБЫ БЫЛИ ФОТКИ/ЦЕНЫ/НАЗВАНИЯ
    const filteredIngredients = orderDescription
        // МОДАЛЬКА
        ? ingredients.filter((ingredients) => orderDescription?.ingredients?.includes(ingredients._id))
        // СТРАНИЦА
        : ingredients.filter((ingredients) => order[0]?.ingredients?.includes(ingredients._id));

        console.log(filteredIngredients);

    // МАНИПУЛЯЦИИ ЧТОБЫ КОРРЕКТНО РАССЧИТАТЬ ЦЕНУ
    const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
    const bunIds = buns.map((bun) => bun._id);
    const filteredBun = filteredIngredients.filter((ingredients) => bunIds.includes(ingredients._id));
    const filteredMainIngredient = filteredIngredients.filter((ingredients) => !bunIds.includes(ingredients._id));
    const mainIngredientsPrice = filteredMainIngredient.reduce((acc, ingredient) => acc + ingredient.price, 0);
    const bunsPrice = filteredBun.reduce((acc, ingredient) => acc + ingredient.price, 0) * 2;
    const price = mainIngredientsPrice + bunsPrice;

    // ОТПРАВЛЯЕМ ДАННЫЕ В РЕДАКС КОТОРЫЕ СОБРАЛИ ЧЕРЕЗ ID URL
    useEffect(() => {
        if (order && order.length > 0 && filteredIngredients && price) {
            const data = {
                order: order[0],
                filteredIngredients: filteredIngredients,
                price: price,
            };
            dispatch(setOrderDescription(data));
        }
    }, [order, filteredIngredients, price]);

    const statusName = orderDescription?.status === 'done' ? 'Выполнен' : orderDescription?.status === 'pending' ? 'Готовится' : 'Создан';
    const statusClass = orderDescription?.status === 'done' ? styles.statusDone : styles.status;

    return (
        <>
            {order && filteredIngredients && price ? (
                <div className={styles.wrapper}>
                    <p className={`text text_type_main-medium ${styles.orderNumber}`}>#{orderDescription?.number}</p>
                    <p className={`text text_type_main-medium ${styles.orderName}`}>{orderDescription?.name}</p>
                    <p className={`text text_type_main-default ${statusClass}`}>{statusName}</p>
                    <p className={`text text_type_main-medium ${styles.orderDescription}`}>Состав: </p>
                    <div className={styles.orderContainer}>
                        {filteredIngredients &&
                            filteredIngredients.map((ingredient) => (
                                <OrderIngredients key={ingredient._id} image_mobile={ingredient.image_mobile} name={ingredient.name} price={ingredient.price} />
                            ))}
                    </div>
                    <div className={styles.footer}>
                        <p className='text text_type_main-default text_color_inactive'>{orderDescription?.createdAt}</p>
                        <div className={styles.priceContainer}>
                            <p className='text text_type_digits-default'>{price}</p>
                            <CurrencyIcon type='primary' />
                        </div>
                    </div>
                </div>
            ) : (
                <Preloader />
            )}
        </>
    );
};

export default OrderInfo;
