import '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../../services/user-slice';
import { profileDataChange } from '../../../../services/user-slice';
import { profileDataChangedToDefault } from '../../../../services/user-slice';

const Profile = () => {
    const dispatch = useDispatch();
    const { name: nameRedux, email: emailRedux, profileDataChanged } = useSelector((state) => state.user);

    const [name, setName] = useState(nameRedux);
    const [email, setEmail] = useState(emailRedux);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [disableNameChange, setDisableNameChange] = useState(true);
    const [disableEmailChange, setDisableEmailChange] = useState(true);
    const [disablePasswordChange, setDisablePasswordChange] = useState(true);

    const smallInactive = 'text text_type_main-small text_color_inactive';

    const toggleDisableNameChange = () => setDisableNameChange(!disableNameChange);
    const toggleDisableEmailChange = () => setDisableEmailChange(!disableEmailChange);
    const toggleDisablePasswordChange = () => setDisablePasswordChange(!disablePasswordChange);

    useEffect(() => {
        if (profileDataChanged) {
            const timer = setTimeout(() => {
                dispatch(profileDataChangedToDefault());
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [profileDataChanged]);

    const handleClear = (name) => {
        if (name === 'name') {
            setName('');
        } else if (name === 'password') {
            setPassword('');
        } else if (name === 'email') {
            setEmail('');
        }
    };

    const handleCancel = () => {
        setName(nameRedux);
        setEmail(emailRedux);
        setDisableNameChange(true);
        setDisableEmailChange(true);
        setDisablePasswordChange(true);
    };

    const classNameToggle = (navData) => (navData.isActive ? 'text text_type_main-medium' : 'text text_type_main-medium text_color_inactive');

    const handleProfileDataChange = (e, email, password, name) => {
        e.preventDefault();
        if (password === '') {
            setPasswordError(true);
            setDisablePasswordChange(false);
        } else {
            setPasswordError(false);
            const userData = { email: email, password: password, name: name };

            if (name || email || password) {
                console.log(userData);
                dispatch(profileDataChange(userData));
                setDisableEmailChange(true);
                setDisablePasswordChange(true);
                setDisableNameChange(true);
            }
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div className={styles.grid}>
            <div className={styles.column}>
                <ul className={styles.profileNavigation}>
                    <li>
                        <NavLink to='/profile' className={classNameToggle}>
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/profile/orders' className={classNameToggle}>
                            История заказов
                        </NavLink>
                    </li>
                    <li onClick={(e) => handleLogout(e)}>
                        <p className='text text_type_main-medium text_color_inactive'>Выход</p>
                    </li>
                </ul>
                <div className={styles.marginAndOpacity}>
                    <p className='text text_type_main-small text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
                </div>
            </div>
            <form className={styles.column} onSubmit={(e) => handleProfileDataChange(e, email, password, name)}>
                <Input
                    placeholder={'Имя'}
                    name={'name'}
                    type={'text'}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    disabled={disableNameChange}
                    icon={disableNameChange ? 'EditIcon' : 'CloseIcon'}
                    onIconClick={disableNameChange ? toggleDisableNameChange : () => handleClear('name')}
                />

                <Input
                    placeholder={'E-mail'}
                    name={'email'}
                    type={'email'}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    disabled={disableEmailChange}
                    icon={disableEmailChange ? 'EditIcon' : 'CloseIcon'}
                    onIconClick={disableEmailChange ? toggleDisableEmailChange : () => handleClear('email')}
                />
                <Input
                    placeholder={'Пароль'}
                    name={'password'}
                    type={disablePasswordChange ? 'password' : 'text'}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    error={passwordError}
                    errorText={'поле не должно быть пустым'}
                    size={'default'}
                    disabled={disablePasswordChange}
                    icon={disablePasswordChange ? 'EditIcon' : 'CloseIcon'}
                    onIconClick={disablePasswordChange ? toggleDisablePasswordChange : () => handleClear('password')}
                />
                {!disableNameChange || !disableEmailChange || !disablePasswordChange ? (
                    <div className={styles.row}>
                        <Button type='secondary' onClick={handleCancel}>
                            Отмена
                        </Button>
                        <Button type='primary'>Сохранить</Button>
                    </div>
                ) : null}
            </form>
            {profileDataChanged && (
                <p className={smallInactive}>
                    данные успешно изменены
                </p>
            )}
            {profileDataChanged === false && (
                <p className={smallInactive}>
                    произошла ошибка
                </p>
            )}
        </div>
    );
};

export default Profile;