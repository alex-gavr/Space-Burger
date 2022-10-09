import "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import styles from "./profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../../utils/getCookie";
import { logout } from "../../../services/user-slice";


const Profile = () => {
    const dispatch = useDispatch();
    const {name: nameRedux, email: emailRedux} = useSelector((state) => state.user);

    const [name, setName] = useState(nameRedux);
    const [email, setEmail] = useState(emailRedux);
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [disabled, setDisabled] = useState(true);

    const toggleDisabled = () => setDisabled(!disabled);

    const onIconClick = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    };

    let cookie = getCookie('token');
    console.log(cookie);

    const classNameToggle = (navData) =>
        navData.isActive
            ? "text text_type_main-medium"
            : "text text_type_main-medium text_color_inactive";


    const handleLogout = (e) =>{
        e.preventDefault();
        dispatch(logout());
    }


    return (
        <div className={styles.grid}>
            <div className={styles.column}>
                <ul className={styles.profileNavigation}>
                    <li>
                        <NavLink to="/profile" className={classNameToggle}>Профиль</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/orders" className={classNameToggle}>История заказов</NavLink>
                    </li>
                    <li onClick={(e) => handleLogout(e)}>
                        <button className="text text_type_main-medium text_color_inactive">Выход</button>
                    </li>
                </ul>
                <p style={{marginTop: '4rem', opacity:'0.5'}} className='text text_type_main-small text_color_inactive'>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={styles.column}>
                <Input
                    placeholder={"Имя"}
                    name={"name"}
                    type={"text"}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                    disabled={disabled}
                    icon={"EditIcon"}
                    onIconClick={toggleDisabled}
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
                    disabled={disabled}
                    icon={"EditIcon"}
                    onIconClick={toggleDisabled}
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
                    disabled={disabled}
                    icon={disabled ? "EditIcon" : passwordType === "password" ? "ShowIcon" : "HideIcon"}
                    onIconClick={disabled ? toggleDisabled : onIconClick}
                />
            </div>
        </div>
    );
};

export default Profile;
