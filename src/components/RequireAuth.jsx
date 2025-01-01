import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { LINK_TO } from "../data/appData";
import { currentUserSelector } from "../redux/authSlice";

const RequireAuth = ({ allowedRoles }) => {
	const location = useLocation();
	const currentUser = useSelector(currentUserSelector);
	const hasAccess = Boolean(currentUser?.roles?.find(role => allowedRoles?.includes(role)));
	return (
		hasAccess
			? <Outlet />
			: currentUser?.accessToken
				? <Navigate to={LINK_TO.unauthorized} state={{ from: location }} replace />
				: <Navigate to={LINK_TO.signIn} state={{ from: location }} replace />
	);
};

export default RequireAuth;