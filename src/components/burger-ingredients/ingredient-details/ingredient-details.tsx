import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { setDetails } from '../../../services/ingredient-details-slice';
import { useMemo } from 'react';
import { IIngredient } from '../../../types/data';
import { useAppDispatch, useAppSelector } from '../../../services/hook';

export const IngredientDetails: FC = (): JSX.Element => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { isModalOpen } = useAppSelector((state) => state.modal);
    const { ingredients } = useAppSelector((state) => state.ingredients);

    const filteredIngredient = useMemo(() => ingredients?.filter((ingredient: IIngredient) => ingredient._id === id), [ingredients, id]);

    useEffect(() => {
        if (filteredIngredient && filteredIngredient.length > 0) {
            dispatch(setDetails(filteredIngredient[0]));
        }
    }, [filteredIngredient, dispatch]);

    const { details } = useAppSelector((state) => state.details);

    return (
        <div className={styles.wrapper}>
            {!isModalOpen && <h1 className='text text_type_main-large mb-8'>Детали Ингредиента</h1>}
            <img src={details?.image_large} alt='hello' />
            <p className='text text_type_main-medium mb-8'>{details?.name}</p>
            <div className={styles.row}>
                <div className={styles.column}>
                    <p className='text text_type_main-small text_color_inactive'>Калории, ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{details?.calories}</p>
                </div>
                <div className={styles.column}>
                    <p className='text text_type_main-small text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{details?.proteins}</p>
                </div>
                <div className={styles.column}>
                    <p className='text text_type_main-small text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'> {details?.fat}</p>
                </div>
                <div className={styles.column}>
                    <p className='text text_type_main-small text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{details?.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
};
