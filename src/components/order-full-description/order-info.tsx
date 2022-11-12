import styles from './order-info.module.css';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredients } from './order-ingredient-component/order-ingredients';
import { useParams } from 'react-router-dom';
import { setOrderDescriptionLink } from '../../services/order-description-slice';
import { Preloader } from '../preloader/preloader';
import { IOrderDetailsAdjustedForModal, IOrderWithData } from '../../types/data';
import { useAppDispatch, useAppSelector } from '../../services/hook';

const OrderInfo: FC = (): JSX.Element => {
    const [orderDetailsAdjustedForModal, setOrderDetailsAdjustedForModal] = useState<IOrderDetailsAdjustedForModal[] | null>();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { ingredients } = useAppSelector((state) => state.ingredients);

    // Данные о заказе переданные в редакс
    const { orderDescription } = useAppSelector((state) => state.orderDescription);

    // Данные всех заказов. Нужны здесь чтобы если открыли заказ по линке найти этот заказ
    const { orders } = useAppSelector((state) => state.feedOrders);

    // Нахожу заказ, который открыли по линке
    const order =  useMemo(() => orders?.filter((order) => order._id === id), [orders, id]);

    // Отправляю инфу о заказе в редакс, который открыли по линке
    // useEffect(() => {
    //     if (!orderDescription && order !== undefined) {
    //         dispatch(setOrderDescriptionLink(order[0]));
    //     }
    // }, [order, id, orderDescription, dispatch]);

    // Если данные о заказе есть в редаксе / или мы их получили, то запускаю функицю ниже, которая соберет данные так, чтобы их отобразить
    useEffect(() => {
        if (orderDescription) {
            handleOrderDetailsAdjustedForModal();
        }
    },[orderDescription])


    // Собераю данные для отображения и расчета стоимости, и записываем их в useState -- orderDetailsAdjustedForModal
    const handleOrderDetailsAdjustedForModal  = () => {
        if (orderDescription) {
            const orderWithData: IOrderWithData[] =
                orderDescription &&
                orderDescription.ingredients.map((id) => {
                    const ingredientData = ingredients.filter((ingredient) => id === ingredient._id);
                    return {
                        id: id,
                        name: ingredientData[0].name,
                        image: ingredientData[0].image_mobile,
                        price: ingredientData[0].price,
                    };
                });
            // Смотрю сколько раз повторяются инргедиенты и записываем в удобном формате
            const result =
                orderDescription &&
                Object.entries(
                    orderDescription.ingredients.reduce((acc: any, value) => {
                        acc[value] = (acc[value] || 0) + 1;
                        return acc;
                    }, {})
                ).map((value: any) => {
                    return {
                        id: value[0],
                        times: value[1],
                    };
                });
                // добавляю timesRepeated в массив (массив новый)
            const fullData = orderWithData.map((data) => {
                const ing = result.filter((value: any) => value.id === data.id);
                const timesRepeated = ing[0].times;
                return {
                    ...data,
                    timesRepeated: timesRepeated,
                };
            });
            // Фильтрую массив от повторений
            const orderDetailsAdjustedForModal: IOrderDetailsAdjustedForModal[] = fullData.filter(
                (value, index, self) => index === self.findIndex((t) => t.id === value.id && t.name === value.name)
            );
            setOrderDetailsAdjustedForModal(orderDetailsAdjustedForModal);
        }
    };

    //  Считаем тотал
    const price = orderDetailsAdjustedForModal?.reduce((acc, ingredient) => acc + (ingredient.price * ingredient.timesRepeated), 0);
    
    // Манипуляции чтобы корректно отображать статус и цвет
    const statusName = orderDescription?.status === 'done' ? 'Выполнен' : orderDescription?.status === 'pending' ? 'Готовится' : 'Создан';
    const statusClass = orderDescription?.status === 'done' ? styles.statusDone : styles.status;

    return (
        <>
            {order && orderDetailsAdjustedForModal && price ? (
                <div className={styles.wrapper}>
                    <p className={`text text_type_main-medium ${styles.orderNumber}`}>#{orderDescription ? orderDescription?.number : order[0]?.number} </p>
                    <p className={`text text_type_main-medium ${styles.orderName}`}>{orderDescription ? orderDescription?.name : order[0]?.name}</p>
                    <p className={`text text_type_main-default ${statusClass}`}>{statusName}</p>
                    <p className={`text text_type_main-medium ${styles.orderDescription}`}>Состав: </p>
                    <div className={styles.orderContainer}>
                        {orderDetailsAdjustedForModal &&
                            orderDetailsAdjustedForModal.map((ingredient) => (
                                <OrderIngredients
                                    key={ingredient.id}
                                    image_mobile={ingredient.image}
                                    name={ingredient.name}
                                    price={ingredient.price}
                                    timesRepeated={ingredient.timesRepeated}
                                />
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

export default React.memo(OrderInfo);
