import { FC } from 'react';
import { Outlet, Navigate, useLocation, Location } from 'react-router-dom';
import { useAppSelector } from '../../services/hook';


const ResetPasswordProtectionRoute:FC = (): JSX.Element => {
    const { allowToGoToPasswordReset } = useAppSelector((state) => state.user);
    const location: Location = useLocation();
    const from: string = location.state?.from || '/';

    return allowToGoToPasswordReset ? <Outlet /> : <Navigate to={from} />;
};

export default ResetPasswordProtectionRoute;
