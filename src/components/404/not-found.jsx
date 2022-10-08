
import styles from './404.module.css';
import { Link } from "react-router-dom";

const NotFound = () => {
    return( 
        <div className={styles.container}>
            <div className={styles.logContainer}>
                <h1 className="text text_type_main-default">Куда это вы забрели? 👀</h1>
                <p className="text text_type_main-default">Тут пока ничего нет 😢 Но свой бургер можно собрать вон там 👇</p>
                <Link to='/' className="text text_type_main-default">Собрать свой уникальный бургер</Link>
            </div>
        </div>
    )
}

export default NotFound;