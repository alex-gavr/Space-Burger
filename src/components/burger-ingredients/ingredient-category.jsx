import '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Ingredient from './ingredient';

const IngredientCategory = ({type , title}) => {
    const { ingredients, loading, error } = useSelector((state) => state.ingredients);

    const filteredIngredients = useMemo(() => ingredients.filter((ingredient) => ingredient.type === type), [ingredients]);

    const { bun, mainIngredients } = useSelector((state) => state.burgerConstructor);

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
IngredientCategory.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};
export default IngredientCategory;
