import { Navigate, useLocation } from "react-router-dom";

import { AuthContainer } from "../components/AuthComponent/AuthContainer";
import { AlertWarning, AlertSuccess } from "../components/Alert";
import { LoginForm } from "../components/AuthComponent/Form/LoginForm";
import { Loader } from "../components/Loader";
import { useAppSelector } from "../hook";

const Loginpage: React.FC = () => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/profile";
  const { errorProcessing, message, isRegistration, isAuth, status } = useAppSelector(
    (state) => state.authUser || {});
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
        {status === "rejected" && errorProcessing && (
          <AlertWarning
            message={errorProcessing.message}
            errors={errorProcessing.errors}
          />
        )}
        {isRegistration && <AlertSuccess message={message} />}
      </div>
      <LoginForm />
    </AuthContainer>
  );
};
export { Loginpage };
