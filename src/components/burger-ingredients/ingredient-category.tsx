import '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import Ingredient from './ingredient';
import { RootState } from '../../types';
import { IIngredient } from '../../types/data';

interface Props {
    type: string;
    title: string;
}

const IngredientCategory: FC<Props> = ({type , title}): JSX.Element => {
    const { ingredients } = useSelector((state: RootState) => state.ingredients);

    const filteredIngredients = useMemo(() => ingredients.filter((ingredient: IIngredient) => ingredient.type === type), [ingredients]);

    const { bun, mainIngredients } = useSelector((state: RootState) => state.burgerConstructor);

    return (
        <div>
            <h3 className='text text_type_main-medium'>{title}</h3>
            <ul className={styles.container}>
                {filteredIngredients &&
                    filteredIngredients.map((ingredient) => {
                        return <Ingredient ingredient={ingredient} bun={bun} mainIngredients={mainIngredients} key={ingredient._id} />;
                    })}
            </ul>
        </div>
    );
};

export default IngredientCategory;
