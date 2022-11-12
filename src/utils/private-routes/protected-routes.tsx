import { Outlet, Navigate, useLocation, Location } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from '../../services/hook';

const ProtectedRoutes: FC = (): JSX.Element => {
    const { loginSuccess } = useAppSelector((state) => state.user);
    const location: Location = useLocation();
    
    return loginSuccess ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />;
};

export default ProtectedRoutes;
