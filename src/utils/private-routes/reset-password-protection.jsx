import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const ResetPasswordProtectionRoute = () => {
    const { allowToGoToPasswordReset } = useSelector((state) => state.user);
    const location = useLocation();
    const from = location.state?.from || '/';

    return allowToGoToPasswordReset ? <Outlet /> : <Navigate to={from} />;
};

export default ResetPasswordProtectionRoute;
