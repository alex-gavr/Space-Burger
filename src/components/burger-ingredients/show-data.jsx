import '@ya.praktikum/react-developer-burger-ui-components';
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../../utils/create-context';





const ShowData = (props) => {

    const data = useContext(DataContext);
    const filteredData = data.filter(ingredient => ingredient.type === props.type);


    return(
        <div>
            <h3 className='text text_type_main-medium'>{props.heading}</h3>
            <ul className={styles.container}>
            {
                filteredData.map((ingredient) => {
                    return(
                        <li key={ingredient._id} className={styles["container-element"]} onClick={()=> {props.setId(ingredient._id); props.setIsModalOpened(true)}}  >
                            <div className={styles["container-image"]}>
                                <img src={ingredient.image} alt={ingredient.name} />
                            </div>
                            <div className={styles["container-price"]}>
                                <p className='text text_type_digits-default'>{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className='text text_type_main-default'>{ingredient.name}</p>
                            {ingredient.__v >= 1 ? <Counter count={ingredient.__v} size="default" /> : null }
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}
ShowData.propTypes = {
    type: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    setId: PropTypes.func.isRequired,
    setIsModalOpened: PropTypes.func.isRequired
}
export default ShowData