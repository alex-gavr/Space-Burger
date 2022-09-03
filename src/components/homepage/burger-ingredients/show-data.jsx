import '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-ingredients.module.css';
import { data } from '../../../utils/data';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';


const ShowData = (props) => {
    let filteredData = data.filter(o => o.type === props.type);
    return(
        <div>
            <h3 className='text text_type_main-medium'>{props.heading}</h3>
            <ul className={styles.container}>
            {
                filteredData.map((o) => {
                    return(
                        <li key={o._id} className={styles["container-element"]} >
                            <div className={styles["container-image"]}>
                                <img src={o.image} alt={o.name} />
                            </div>
                            <div className={styles["container-price"]}>
                                <p className='text text_type_digits-default'>{o.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className='text text_type_main-default'>{o.name}</p>
                            {o.__v >= 1 ? <Counter count={o.__v} size="default" /> : null }
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}
export default ShowData