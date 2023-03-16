import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContainer } from "../components/AuthComponent/AuthContainer";
import { AlertWarning, AlertSuccess } from "../utils/Alert";
import { LoginForm } from "../components/AuthComponent/Form/LoginForm";
import { Loader } from "../components/Loader";

const Loginpage = () => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/profile";
  const { errorProcessing, isRegistration, isAuth, status } = useSelector(
    (state) => state.authUser || {}
  );
  if (status === "loading") return <Loader />;
  if (isAuth) return <Navigate to={fromPage} replace />;
  return (
    <AuthContainer>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Добро пожаловать!
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Пожалуйста, войдите в ваш аккаунт
        </p>
        {status === "rejected" && (
          <AlertWarning errorProcessing={errorProcessing} />
        )}
        {isRegistration && <AlertSuccess errorProcessing={errorProcessing} />}
      </div>
      <LoginForm />
    </AuthContainer>
  );
};
export { Loginpage };
