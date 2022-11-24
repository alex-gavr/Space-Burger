import '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, FC, SyntheticEvent } from 'react';
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import { deleteOrderDetails, fetchOrderDetails } from '../../services/order-details-slice';
import { useDrop } from 'react-dnd';
import { addIngredient, emptyConstructor } from '../../services/constructor-slice';
import Card from './card';
import { deleteIngredient } from '../../services/constructor-slice';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { openModalOrder } from '../../services/modal-slice';
import { onCloseModal } from '../../services/modal-slice';
import { v4 as uuidv4 } from 'uuid';
import { PreloaderSmall } from '../preloader/preloader-small';
import { OrderDetails } from './order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../services/hook';

const BurgerConstructor: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    const { bun, mainIngredients } = useAppSelector((state) => state.burgerConstructor);
    const { orderDetails, loading } = useAppSelector((state) => state.orderDetails);
    const { loginSuccess } = useAppSelector((state) => state.user);

    // Считаем Тотал
    const totalMainIngredients = mainIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    const totalBuns = bun.reduce((acc, bun) => acc + bun.price, 0) * 2;
    const totalPrice = totalMainIngredients + totalBuns;

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (loginSuccess) {
            // Айдишички для Поста считаем только при клике "оформить заказ"
            const mainIngredientsIds = mainIngredients.map((ingredient) => ingredient._id);
            const bunsIds = bun.map((ingredient) => ingredient._id);
            const allIngredientIds = [...bunsIds, ...mainIngredientsIds, ...bunsIds];
            dispatch(fetchOrderDetails(allIngredientIds));
        } else {
            navigate('/login');
        }
    };

    const handleCloseModal = () => {
        dispatch(onCloseModal());
        // delete order details
        dispatch(deleteOrderDetails());
        // delete ingredients from constructor
        dispatch(emptyConstructor());
    };

    useEffect(() => {
        if (orderDetails.success && loginSuccess) {
            dispatch(openModalOrder());
        }
    }, [orderDetails, loginSuccess]);

    // DND
    const [{ canDrop }, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: (ingredient: any) => {
            const item = { ...ingredient.ingredient, uuid: uuidv4() };
            dispatch(addIngredient(item));
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <section className={styles.wrapper}>
            <ul ref={drop} className={`${styles.container} ${canDrop ? styles.canDrop : null}`} data-test='drag-destination'>
                {/* ВЕРХНЯЯ БУЛКА */}
                <div className={styles.paddingRight}>
                    {bun &&
                        bun.map((ingredient, index) => (
                            <li key={index}>
                                <ConstructorElement type='top' isLocked={true} text={ingredient.name + ' (верх)'} price={ingredient.price} thumbnail={ingredient.image} />
                            </li>
                        ))}
                </div>
                {/* ОСНОВНЫЕ ИНГРЕДИЕНТЫ */}
                <div className={styles.ingredients}>
                    {mainIngredients &&
                        mainIngredients.map((ingredient, index) => (
                            <li className={styles.containerRow} key={ingredient.uuid}>
                                <Card id={ingredient._id} index={index}>
                                    <DragIcon type='primary' />
                                    <ConstructorElement
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                        handleClose={() => dispatch(deleteIngredient(ingredient))}
                                    />
                                </Card>
                            </li>
                        ))}
                </div>
                {/* НИЖНЯЯ БУЛКА */}
                <div className={styles.paddingRight}>
                    {bun &&
                        bun.map((ingredient, index) => (
                            <li key={index}>
                                <ConstructorElement
                                    type='bottom'
                                    isLocked={true}
                                    text={ingredient.name + ' (низ)'}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                />
                            </li>
                        ))}
                </div>
            </ul>
            <div className={styles.containerTotal}>
                <div className={styles.containerRow}>
                    {/* Цена */}
                    <p className='text text_type_digits-medium'>{totalPrice}</p>
                    <CurrencyIcon type='primary' />
                </div>
                {/* Кнопка оформить заказ */}
                <Button
                    htmlType='submit'
                    type='primary'
                    size='large'
                    onClick={handleSubmit}
                    disabled={bun.length === 0 || mainIngredients.length === 0 ? true : false}
                    data-test='makeOrderButton'>
                    {loading ? <PreloaderSmall /> : 'Оформить заказ'}
                </Button>
            </div>
            {orderDetails.success && loginSuccess && (
                <Modal onClose={handleCloseModal}>
                    <OrderDetails orderNumber={orderDetails.order.number} />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;
