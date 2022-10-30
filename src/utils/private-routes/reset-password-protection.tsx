import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation, Location } from 'react-router-dom';
import { RootState } from '../../types';

const ResetPasswordProtectionRoute:FC = (): JSX.Element => {
    const { allowToGoToPasswordReset } = useSelector((state: RootState) => state.user);
    const location: Location = useLocation();
    const from: string = location.state?.from || '/';

    return allowToGoToPasswordReset ? <Outlet /> : <Navigate to={from} />;
};

export default ResetPasswordProtectionRoute;
