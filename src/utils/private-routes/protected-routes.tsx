import { Outlet, Navigate, useLocation, Location } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import { RootState } from '../../services/store';

const ProtectedRoutes: FC = (): JSX.Element => {
    const { loginSuccess } = useSelector((state: RootState) => state.user);
    const location: Location = useLocation();
    
    return loginSuccess ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />;
};

export default ProtectedRoutes;
