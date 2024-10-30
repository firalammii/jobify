import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { LINK_TO } from "../data/appData";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const { currUser } = useSelector(state => state.user);

    return (
        currUser?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : currUser?.accessToken
                ? <Navigate to={LINK_TO.unauthorized} state={{ from: location }} replace />
                : <Navigate to={LINK_TO.signIn} state={{ from: location }} replace />
    );
};

export default RequireAuth;