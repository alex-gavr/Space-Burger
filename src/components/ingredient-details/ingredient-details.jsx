import { useContext } from "react";
import { DataContext } from "../../utils/create-context";
import Modal from "../modal/modal";
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';



export const IngredientDetails = ({isOpened, isClosed, id}) => {
    
    const data = useContext(DataContext);
    
    if (!isOpened) return null;

    const filteredData = data.filter(ingredient => id.includes(ingredient._id));

    return ( 
        <Modal heading="Детали ингредиента" onClick={isClosed}>
            <div className={styles.wrapper}>
                <img src={filteredData[0].image_large}  alt="hello" />
                <p className="text text_type_main-default mb-8">{filteredData[0].name}</p>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{filteredData[0].calories}</p>
                    </div>
                    <div className={styles.column}>
                        <p className="text text_type_main-small text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{filteredData[0].proteins}</p>
                    </div>
                    <div className={styles.column}>
                        <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive"> {filteredData[0].fat}</p>
                    </div>
                    <div className={styles.column}>
                        <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{filteredData[0].carbohydrates}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
IngredientDetails.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    isClosed: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}