import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoggedInRoutes = () => {
    const { loginSuccess } = useSelector((state) => state.user);
    return loginSuccess ? <Outlet /> : <Navigate to='/login' />;
};

export default LoggedInRoutes;
