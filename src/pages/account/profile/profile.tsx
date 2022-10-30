import '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FC } from 'react';
import styles from './profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../services/user-slice';
import { profileDataChange } from '../../../services/user-slice';
import { profileDataChangedToDefault } from '../../../services/user-slice';
import { PreloaderSmall } from '../../../components/preloader/preloader-small';
import { AppDispatch, RootState } from '../../../types';
import { INavData } from '../../../types/data';

const Profile: FC = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();
    const { name: nameRedux, email: emailRedux, profileDataChanged, loading } = useSelector((state: RootState) => state.user);

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
        setDisablePasswordChange(true);
    };

    const classNameToggle = (navData: INavData) => (navData.isActive ? 'text text_type_main-medium' : 'text text_type_main-medium text_color_inactive');

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

    const handleLogout = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
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
                    <li onClick={(e) => handleLogout(e)} className={styles.pointer}>
                        <p className='text text_type_main-medium text_color_inactive'>Выход</p>
                    </li>
                    {loading && <PreloaderSmall />}
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
        </div>
    );
};

export default Profile;
