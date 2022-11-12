import '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './burger-ingredients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
import { onOpenModal } from '../../services/modal-slice';
import { IIngredient } from '../../types/data';
import { useAppDispatch } from '../../services/hook';

interface IProps {
    ingredient: IIngredient;
    bun: Array<IIngredient>;
    mainIngredients: Array<IIngredient>;
}

const Ingredient: FC<IProps> = ({ ingredient, bun, mainIngredients }):JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenModal = (ingredient: IIngredient): void => {
        dispatch(onOpenModal('Детали ингредиента'));
        navigate(`/ingredients/${ingredient._id}`, { state: { background: location, ingredient: ingredient } });
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ingredient',
        item: { ingredient: ingredient },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    let count:number = 0;
    if (ingredient.type === 'bun') {
        count = bun.filter((item) => item._id === ingredient._id).length * 2;
    } else {
        count = mainIngredients.filter((item) => item._id === ingredient._id).length;
    }

    return (
        <li className={styles.containerElement} onClick={() => handleOpenModal(ingredient)} ref={drag}>
            <div className={styles.containerImage}>
                <img src={ingredient.image} alt={ingredient.name} />
            </div>
            <div className={styles.containerPrice}>
                <p className='text text_type_digits-default'>{ingredient.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p className='text text_type_main-default'>{ingredient.name}</p>
            {count === 0 ? null : <Counter count={count} size='default' />}
        </li>
    );
};

export default Ingredient;
