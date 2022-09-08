import { useContext } from "react";
import { DataContext } from "../../utils/create-context";
import Modal from "../modal/modal";
import styles from './ingredient-details.module.css'



export const IngredientDetails = ({isOpened, isClosed}) => {
    
    const data = useContext(DataContext);

    if (!isOpened){ 
        return null;
    }

    return ( 
        <Modal heading="Детали ингредиента" onClick={isClosed}>
            <div className={styles.wrapper}>
                <img src={data[5].image_large}  alt="hello" />
                <p className="text text_type_main-default mb-8">{data[5].name}</p>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{data[5].calories}</p>
                    </div>
                    <div className={styles.column}>
                        <p className="text text_type_main-small text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{data[5].proteins}</p>
                    </div>
                    <div className={styles.column}>
                        <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive"> {data[5].fat}</p>
                    </div>
                    <div className={styles.column}>
                        <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{data[5].carbohydrates}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
