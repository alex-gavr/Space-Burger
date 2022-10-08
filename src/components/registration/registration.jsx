import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const Registration = () => {
    const [name, setName] = useState("");
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
                <h1 className="text text_type_main-medium">Регистрация</h1>
                <Input
                    placeholder={"Имя"}
                    name={"name"}
                    type={"text"}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                />

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
                <Button style={{ marginBottom: "3.5rem" }}>
                    Зарегистрироваться
                </Button>
                <div className={styles.row}>
                    <p className="text text_type_main-small text_color_inactive">
                        Уже зарегистрированы?
                    </p>
                    <Link to="/login" className="text text_type_main-small">Войти</Link>
                </div>
            </form>
        </div>
    );
};
export default Registration;
