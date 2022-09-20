import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";



export const IngredientDetails = () => {

    const {details} = useSelector((state) => state.details);
    
    return ( 
        <div className={styles.wrapper}>
            <img src={details.image_large}  alt="hello" />
            <p className="text text_type_main-default mb-8">{details.name}</p>
            <div className={styles.row}>
                <div className={styles.column}>
                    <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{details.calories}</p>
                </div>
                <div className={styles.column}>
                    <p className="text text_type_main-small text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{details.proteins}</p>
                </div>
                <div className={styles.column}>
                    <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive"> {details.fat}</p>
                </div>
                <div className={styles.column}>
                    <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{details.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
}
IngredientDetails.propTypes = {
    ingredient: PropTypes.object
}