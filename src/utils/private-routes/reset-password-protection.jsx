import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ResetPasswordProtectionRoute = () => {
    const { allowToGoToPasswordReset } = useSelector((state) => state.user);
    return allowToGoToPasswordReset ? <Outlet /> : <Navigate to="/" />;
};

export default ResetPasswordProtectionRoute;
