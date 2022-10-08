import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");

    const onIconClick = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.column}>
                <h1 className="text text_type_main-medium">Вход</h1>

                <Input
                    placeholder={"E-mail"}
                    name={"email"}
                    type={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                />
                <Input
                    placeholder={"Пароль"}
                    name={"password"}
                    type={passwordType}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                    icon={passwordType === "password" ? "ShowIcon" : "HideIcon"}
                    onIconClick={onIconClick}
                />
                <Button style={{ marginBottom: "3.5rem" }}> Войти </Button>
                <div className={styles.helpContainer}>
                    <div className={styles.row}>
                        <p className="text text_type_main-small text_color_inactive">
                            Вы - новый пользователь?
                        </p>
                        <Link to="/registration" className="text text_type_main-small">Зарегистрироваться</Link>
                    </div>
                    <div className={styles.row}>
                        <p className="text text_type_main-small text_color_inactive">
                            Забыли пароль?
                        </p>
                        <Link to="/forgot-password" className="text text_type_main-small">Восстановить пароль</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
