import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const LogInRoutes = () => {
    const { loginSuccess } = useSelector((state) => state.user);
    const location = useLocation();
    const from = location.state?.from || '/';

    return !loginSuccess ? <Outlet /> : <Navigate to={from} />;
};

export default LogInRoutes;
