import '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavigateFunction } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordInit } from '../../services/user-slice';
import { useNavigate } from 'react-router-dom';
import { PreloaderSmall } from '../../components/preloader/preloader-small';
import { AppDispatch, RootState } from '../../types';

const ForgotPassword: FC = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();

    const { initPasswordReset, loading } = useSelector((state: RootState) => state.user);

    const [email, setEmail] = useState<string>('');

    const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>, email: string) => {
        e.preventDefault();
        if (email) {
            dispatch(resetPasswordInit(email));
        }
    };

    useEffect(() => {
        if (initPasswordReset) {
            // redirect
            navigate('/reset-password', { replace: true });
        }
    }, [initPasswordReset]);

    return (
        <div className={styles.wrapper}>
            <form className={styles.column} onSubmit={(e) => handlePasswordReset(e, email)}>
                <h1 className='text text_type_main-medium'>Восстановление пароля</h1>

                <Input
                    placeholder={'Укажите E-mail'}
                    name={'email'}
                    type={'email'}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                {initPasswordReset === false && (
                    <>
                        <p className='text text_type_main-small text_color_inactive'>Такой email в нашей базе не существует</p>
                        <Link to='/registration' className='text text_type_main-small text_color_inactive'>
                            Создать аккаунт
                        </Link>
                    </>
                )}
                <div className={styles.marginBottomForButton}>
                    <Button htmlType='submit' type='primary' disabled={!email}>
                        {loading ? <PreloaderSmall /> : 'Восстановить'}
                    </Button>
                </div>
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
export default ForgotPassword;
