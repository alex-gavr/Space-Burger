import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const LogInRoutes = () => {
    const { loginSuccess } = useSelector((state) => state.user);
    return !loginSuccess ? <Outlet /> : <Navigate to="/" />;
};

export default LogInRoutes;
