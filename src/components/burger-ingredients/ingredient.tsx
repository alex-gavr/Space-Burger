import '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './burger-ingredients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../services/ingredient-details-slice';
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { onOpenModal } from '../../services/modal-slice';
import { IIngredient } from '../../types/data';
import { AppDispatch } from '../../types/index'

interface Props {
    ingredient: IIngredient;
    bun: Array<IIngredient>;
    mainIngredients: Array<IIngredient>;
}

const Ingredient: FC<Props> = ({ ingredient, bun, mainIngredients }):JSX.Element => {
    const dispatch: AppDispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();

    const handleOpenModal = (ingredient: IIngredient): void => {
        dispatch(setDetails(ingredient));
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
