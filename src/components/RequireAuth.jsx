import { useLocation, Navigate, Outlet } from "react-router-dom";
import { sessionStorageKey } from "../data/roles";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const { currUser } = useSelector(state => state.user);
    // const user = auth || JSON.parse(sessionStorage.getItem(sessionStorageKey));

    console.log(currUser);
    return (
        currUser?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : currUser?.accessToken
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/signin" state={{ from: location }} replace />
    );
};

export default RequireAuth;