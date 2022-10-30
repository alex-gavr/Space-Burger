import '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useState } from 'react';
import styles from './styles.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../services/user-slice';
import { PreloaderSmall } from '../../components/preloader/preloader-small';
import { AppDispatch, RootState } from '../../types';

const Registration: FC = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();
    const { accountExists, loading } = useSelector((state: RootState) => state.user);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

    const onIconClick = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    };

    const handleRegistration = (e: React.FormEvent<HTMLFormElement>, email: string, password: string, name: string) => {
        e.preventDefault();
        const userData = { email: email, password: password, name: name };
        if (name && email && password) {
            dispatch(registerUser(userData));
        }
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.column} onSubmit={(e) => handleRegistration(e, email, password, name)}>
                <h1 className='text text_type_main-medium'>Регистрация</h1>
                <Input
                    placeholder={'Имя'}
                    name={'name'}
                    type={'text'}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
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
                {accountExists && (
                    <>
                        <p className='text text_type_main-default text_color_inactive'>У вас уже есть аккаунт. Забли пароль?</p>
                        <Link to='/forgot-password' className='text text_type_main-default text_color_inactive'>
                            <Button htmlType='button' type='primary'>Восстановить пароль</Button>
                        </Link>
                    </>
                )}
                {!accountExists && (
                    <div className={styles.marginBottomForButton}>
                        <Button htmlType='submit' type='primary' disabled={!email || !password || !name}>{loading ? <PreloaderSmall /> : 'Зарегистрироваться'}</Button>
                    </div>
                )}
                <div className={styles.row}>
                    <p className='text text_type_main-small text_color_inactive'>Уже зарегистрированы?</p>
                    <Link to='/login' className='text text_type_main-small'>
                        Войти
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default Registration;
