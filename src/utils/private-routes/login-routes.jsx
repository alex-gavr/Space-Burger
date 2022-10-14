import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const LogInRoutes = () => {
    const { loginSuccess } = useSelector((state) => state.user);
    const location = useLocation();
    console.log(location);
    return !loginSuccess ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default LogInRoutes;
