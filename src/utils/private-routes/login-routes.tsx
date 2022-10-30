import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation, Location } from 'react-router-dom';
import { RootState } from '../../types';

const LogInRoutes: FC = (): JSX.Element => {
    const { loginSuccess } = useSelector((state: RootState) => state.user);
    const location: Location = useLocation();
    const from:string = location.state?.from || '/';

    return !loginSuccess ? <Outlet /> : <Navigate to={from} />;
};

export default LogInRoutes;
