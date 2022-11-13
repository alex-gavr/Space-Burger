import { FC } from 'react';
import { Outlet, Navigate, useLocation, Location } from 'react-router-dom';
import { useAppSelector } from '../../services/hook';


const LogInRoutes: FC = (): JSX.Element => {
    const { loginSuccess } = useAppSelector((state) => state.user);
    const location: Location = useLocation();
    const from:string = location.state?.from || '/';

    return !loginSuccess ? <Outlet /> : <Navigate to={from} />;
};

export default LogInRoutes;
