import '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from './profile.module.css';
import { ProfileForm } from '../../../components/profile-form/profile-form';
import { ProfileNavigation } from '../../../components/profile-navigation/profile-navigation';

const Profile: FC = (): JSX.Element => {

    return (
        <div className={styles.grid}>
            <ProfileNavigation />
            <ProfileForm />
        </div>
    );
};

export default Profile;
