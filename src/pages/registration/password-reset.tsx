import '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useState } from 'react';
import styles from './styles.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { newPasswordSave } from '../../services/user-slice';
import { PreloaderSmall } from '../../components/preloader/preloader-small';
import { AppDispatch, RootState } from '../../services/store';

const ResetPassword: FC = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();
    const { passwordChanged, incorrectToken, loading } = useSelector((state: RootState) => state.user);
    const [token, setToken] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

    const onIconClick = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    };

    const handleSaveNewPassword = (e:  React.FormEvent<HTMLFormElement>, password: string, token: string) => {
        const data = { password: password, token: token };
        e.preventDefault();
        if (data) {
            dispatch(newPasswordSave(data));
        }
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.column} onSubmit={(e) => handleSaveNewPassword(e, password, token)}>
                <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                <Input
                    placeholder={'Введите новый пароль'}
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
                <Input
                    placeholder={'Введите код из письма'}
                    name={'name'}
                    type={'text'}
                    onChange={(e) => setToken(e.target.value)}
                    value={token}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <div className={styles.marginBottomForButton}>
                    <Button htmlType='submit' type='primary' disabled={!token || !password}>{loading ? <PreloaderSmall /> : 'Сохранить'}</Button>
                </div>
                {passwordChanged && (
                    <p className='text text_type_main-small'>
                        пароль успешно изменён
                    </p>
                )}
                {incorrectToken && (
                    <p className='text text_type_main-small'>
                        неверный код из письма
                    </p>
                )}
                <div className={styles.row}>
                    <p className='text text_type_main-small text_color_inactive'>Вспомнили пароль?</p>
                    <Link to='/login' className='text text_type_main-small'>
                        Войти
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default ResetPassword;
