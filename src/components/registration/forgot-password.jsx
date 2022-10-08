import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    return (
        <div className={styles.wrapper}>
            <form className={styles.column}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                
                <Input
                    placeholder={"Укажите E-mail"}
                    name={"email"}
                    type={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                />
                
                <Button style={{ marginBottom: "3.5rem" }}>
                    Восстановить
                </Button>
                <div className={styles.row}>
                    <p className="text text_type_main-small text_color_inactive">
                        Вспомнили пароль?
                    </p>
                    <Link to="/login" className="text text_type_main-small">Войти</Link>
                </div>
            </form>
        </div>
    );
};
export default ForgotPassword;