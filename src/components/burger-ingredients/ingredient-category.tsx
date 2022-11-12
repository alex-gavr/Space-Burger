import '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import Ingredient from './ingredient';
import { IIngredient } from '../../types/data';
import { useAppSelector } from '../../services/hook';

interface Props {
    type: string;
    title: string;
}

const IngredientCategory: FC<Props> = ({type , title}): JSX.Element => {
    const { ingredients } = useAppSelector((state) => state.ingredients);
    const filteredIngredients = useMemo(() => ingredients.filter((ingredient: IIngredient) => ingredient.type === type), [ingredients]);
    const { bun, mainIngredients } = useAppSelector((state) => state.burgerConstructor);

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
