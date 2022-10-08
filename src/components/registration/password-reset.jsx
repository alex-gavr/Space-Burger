import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [name, setName] = useState("");
    
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
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                <Input
                    placeholder={"Введите новый пароль"}
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
                <Input
                    placeholder={"Введите код из письма"}
                    name={"name"}
                    type={"text"}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                />
                <Button style={{ marginBottom: "3.5rem" }}>
                    Сохранить
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
export default ResetPassword;
