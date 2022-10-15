import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
    const { loginSuccess } = useSelector((state) => state.user);
    const location = useLocation();
    
    return loginSuccess ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />;
};

export default ProtectedRoutes;
