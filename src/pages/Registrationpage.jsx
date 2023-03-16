import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RegistrationForm } from "../components/AuthComponent/Form/RegistrationForm";
import { AlertWarning } from "../utils/Alert";
import { AuthContainer } from "../components/AuthComponent/AuthContainer";
import { Loader } from "../components/Loader";

const Registrationpage = () => {
  const { errorProcessing, status, isRegistration, isAuth } = useSelector(
    (state) => state.authUser || {}
  );
  if (status === "loading") return <Loader />;
  if (isAuth) return <Navigate to={"/profile"} replace />;
  if (isRegistration) return <Navigate to={"/login"} replace />;
  return (
    <AuthContainer>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Добро пожаловать!
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Пожалуйста, введите ваши данные для регистрации
        </p>
        {status === "rejected" && (
          <AlertWarning errorProcessing={errorProcessing} />
        )}
      </div>
      <RegistrationForm />
    </AuthContainer>
  );
};
export { Registrationpage };
