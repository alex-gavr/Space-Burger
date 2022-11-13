import styles from './order-info.module.css';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredients } from './order-ingredient-component/order-ingredients';
import { useLocation, useParams } from 'react-router-dom';
import { setOrderDescriptionLink } from '../../services/order-description-slice';
import { Preloader } from '../preloader/preloader';
import { IOrderDetailsAdjustedForModal, IOrderWithData } from '../../types/data';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import { cameFromLinkUser, ORDERS_CONNECT_USER, ORDERS_DISCONNECT_USER } from '../../services/user-order-history-slice';
import { FEED_ORDERS_URL, USER_ORDERS_URL } from '../../utils/config';
import Cookies from 'js-cookie';
import { cameFromLink, ORDERS_CONNECT, ORDERS_DISCONNECT } from '../../services/feed-orders-slice';

const OrderInfo: FC = (): JSX.Element => {
    const [orderDetailsAdjustedForModal, setOrderDetailsAdjustedForModal] = useState<IOrderDetailsAdjustedForModal[] | null>();

    const location = useLocation();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { ingredients } = useAppSelector((state) => state.ingredients);

    const { orderDescription } = useAppSelector((state) => state.orderDescription);

    const { orders: feedOrders, fromLink: fromLinkFeed } = useAppSelector((state) => state.feedOrders);
    const { orders: userOrders, fromLink: fromLinkUser } = useAppSelector((state) => state.userOrderHistory);

    const orderFeed = useMemo(() => feedOrders.filter((order) => order._id === id), [feedOrders, id]);
    const orderUser = useMemo(() => userOrders.filter((order) => order._id === id), [userOrders, id]);

    //  ----------------------------------------------------------------
    const fullToken = Cookies.get('accessToken');
    const accessToken = fullToken?.split(' ')[1];


    useEffect(() => {
        if (userOrders.length === 0 && location.pathname === `/profile/orders/${id}`) {
            dispatch({ type: ORDERS_CONNECT_USER, payload: `${USER_ORDERS_URL}?token=${accessToken}` });
            dispatch(cameFromLinkUser(true));

            return () => {
                if (userOrders.length > 0) {
                    dispatch({ type: ORDERS_DISCONNECT_USER });
                }
            };
        } else if (feedOrders.length === 0 && location.pathname === `/feed/${id}`) {
            dispatch({ type: ORDERS_CONNECT, payload: FEED_ORDERS_URL });
            dispatch(cameFromLink(true));
            return () => {
                if (feedOrders.length > 0) {
                    dispatch({ type: ORDERS_DISCONNECT });
                }
            };
        }
    }, [feedOrders.length, userOrders.length, id, orderDescription, accessToken, location.pathname]);


    useEffect(() => {
        if (feedOrders.length > 0 && fromLinkFeed && orderFeed) {
            dispatch(setOrderDescriptionLink(orderFeed[0]));
        } else if (orderUser.length > 0 && fromLinkUser && orderUser) {
            dispatch(setOrderDescriptionLink(orderUser[0]));
        }
    }, [feedOrders.length, orderUser.length, fromLinkFeed, fromLinkUser, orderFeed, orderUser]);


    useEffect(() => {
        if (orderDescription) {
            handleOrderDetailsAdjustedForModal();
        }
    }, [orderDescription]);

    // Собераю данные для отображения и расчета стоимости, и записываем их в useState -- orderDetailsAdjustedForModal
    const handleOrderDetailsAdjustedForModal = () => {
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

    const price = orderDetailsAdjustedForModal?.reduce((acc, ingredient) => acc + ingredient.price * ingredient.timesRepeated, 0);

    const statusName = orderDescription?.status === 'done' ? 'Выполнен' : orderDescription?.status === 'pending' ? 'Готовится' : 'Создан';
    const statusClass = orderDescription?.status === 'done' ? styles.statusDone : styles.status;

    return (
        <>
            {orderDetailsAdjustedForModal && price ? (
                <div className={styles.wrapper}>
                    <p className={`text text_type_main-medium ${styles.orderNumber}`}>#{orderDescription?.number} </p>
                    <p className={`text text_type_main-medium ${styles.orderName}`}>{orderDescription?.name}</p>
                    <p className={`text text_type_main-default ${statusClass}`}>{statusName}</p>
                    <p className={`text text_type_main-medium ${styles.orderDescription}`}>Состав: </p>
                    <div className={styles.orderContainer}>
                        {orderDetailsAdjustedForModal.map((ingredient) => (
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
                        <p className='text text_type_main-default text_color_inactive'>
                            {orderDescription &&
                                `${new Date(orderDescription?.createdAt).toLocaleDateString()} ${new Date(orderDescription?.createdAt).getHours()}:${new Date(
                                    orderDescription?.createdAt
                                ).getMinutes()}`}
                        </p>
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
