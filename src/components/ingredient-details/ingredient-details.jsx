import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';



export const IngredientDetails = ({ingredient}) => {
    
    return ( 
        <div className={styles.wrapper}>
            <img src={ingredient.image_large}  alt="hello" />
            <p className="text text_type_main-default mb-8">{ingredient.name}</p>
            <div className={styles.row}>
                <div className={styles.column}>
                    <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                </div>
                <div className={styles.column}>
                    <p className="text text_type_main-small text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                </div>
                <div className={styles.column}>
                    <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive"> {ingredient.fat}</p>
                </div>
                <div className={styles.column}>
                    <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
}
IngredientDetails.propTypes = {
    ingredient: PropTypes.object
}