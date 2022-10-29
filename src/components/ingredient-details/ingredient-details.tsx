import styles from './ingredient-details.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { setDetails } from '../../services/ingredient-details-slice';
import { useMemo } from 'react';
import { IIngredient } from '../../types/data';
import { RootState, AppDispatch } from '../../types';

export const IngredientDetails: FC = (): JSX.Element => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const { isModalOpen } = useSelector((state: RootState) => state.modal);
    const { ingredients } = useSelector((state: RootState) => state.ingredients);

    const filteredIngredient = useMemo(() => ingredients?.filter((ingredient: IIngredient) => ingredient._id === id), [ingredients, id]);


    useEffect(() => {
        if (filteredIngredient && filteredIngredient.length > 0) {
            dispatch(setDetails(filteredIngredient[0]));
        }
    }, [filteredIngredient]);


    const { details } = useSelector((state: RootState) => state.details);
    console.log(details);
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
