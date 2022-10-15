import '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordInit } from '../../services/user-slice';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { initPasswordReset } = useSelector((state) => state.user);

    const [email, setEmail] = useState('');

    const handlePasswordReset = (e, email) => {
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
                    <Button htmlType='submit' type='secondary' disabled={email ? false : true}>Восстановить</Button>
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
