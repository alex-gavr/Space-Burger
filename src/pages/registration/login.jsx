import '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import styles from './styles.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/user-slice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');

    const onIconClick = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    };

    const handleLogin = (e, email, password) => {
        e.preventDefault();
        const data = { email: email, password: password };
        if (email && password) {
            dispatch(login(data));
            if (location.state?.from) {
                navigate(location.state.from);
            }
        }
    };
    

    return (
        <div className={styles.wrapper}>
            <form className={styles.column} onSubmit={(e) => handleLogin(e, email, password)}>
                <h1 className='text text_type_main-medium'>Вход</h1>
                <Input
                    placeholder={'E-mail'}
                    name={'email'}
                    type={'email'}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Input
                    placeholder={'Пароль'}
                    name={'password'}
                    type={passwordType}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    icon={passwordType === 'password' ? 'ShowIcon' : 'HideIcon'}
                    onIconClick={onIconClick}
                />
                <div className={styles.marginBottomForButton}>
                    <Button htmlType='submit' type='primary' disabled={!email || !password}> Войти </Button>
                </div>
                <div className={styles.helpContainer}>
                    <div className={styles.row}>
                        <p className='text text_type_main-small text_color_inactive'>Вы - новый пользователь?</p>
                        <Link to='/registration' className='text text_type_main-small'>
                            Зарегистрироваться
                        </Link>
                    </div>
                    <div className={styles.row}>
                        <p className='text text_type_main-small text_color_inactive'>Забыли пароль?</p>
                        <Link to='/forgot-password' className='text text_type_main-small'>
                            Восстановить пароль
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
