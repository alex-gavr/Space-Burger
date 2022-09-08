import React from "react";
import styles from './preloader.module.css';
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

export const Preloader = () => {
    return( 
        <div className={styles.container}>
            <div className={styles.logContainer}>
                <Logo />
            </div>
        </div>
    )
}