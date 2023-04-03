import { useLocation, Navigate } from "react-router-dom";

import { useAppSelector } from "../hook";

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.authUser);
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};
export { RequireAuth };
