import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../services/hook';
import { profileDataChange, profileDataChangedToDefault } from '../../../services/user-slice';
import { PreloaderSmall } from '../../preloader/preloader-small';
import styles from './profile-form.module.css';

export const ProfileForm: FC = () => {

    const dispatch = useAppDispatch();
    const { name: nameRedux, email: emailRedux, profileDataChanged, loading } = useAppSelector((state) => state.user);

    const [name, setName] = useState<string>(nameRedux);
    const [email, setEmail] = useState<string>(emailRedux);
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [disableNameChange, setDisableNameChange] = useState<boolean>(true);
    const [disableEmailChange, setDisableEmailChange] = useState<boolean>(true);
    const [disablePasswordChange, setDisablePasswordChange] = useState<boolean>(true);

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

    const handleClear = (name: string) => {
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
    }


    const handleProfileDataChange = (e: React.FormEvent<HTMLFormElement>, email: string, password: string, name: string) => {
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
    return (
        <>
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
                        <Button htmlType='button' type='secondary' onClick={handleCancel}>
                            Отмена
                        </Button>
                        <Button htmlType='submit' type='primary'>
                            {loading ? <PreloaderSmall /> : 'Сохранить'}
                        </Button>
                    </div>
                ) : null}
            </form>
            {profileDataChanged && <p className={smallInactive}>данные успешно изменены</p>}
            {profileDataChanged === false && <p className={smallInactive}>произошла ошибка</p>}
        </>
    );
};
