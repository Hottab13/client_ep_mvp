import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../../hook";
import { loginUser } from "../../../redux/slices/authSlice";
import { LoginUserProps } from "../../../types/UserTypes";
import { ErrorsSpan } from "../../ErrorsSpan";
import { FormIcon } from "../FormIcon";


const LoginForm:React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUserProps>({
    mode: "onBlur",
  });
  const handleLogin: SubmitHandler<LoginUserProps> = (data) => {
    dispatch(loginUser(data));
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      autoComplete="off"
      className="mt-8 space-y-6"
    >
      <input type="hidden" name="remember" value="true" />

      <div className="relative">
        <FormIcon error={errors?.email} />
        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
          Email
        </label>
        <input
          {...register("email", {
            required: "Обязательное поле!",
            minLength: {
              value: 5,
              message: "Минимум 5 символов!",
            },
            maxLength: {
              value: 100,
              message: "Максимум 100 символов!",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Некоректный email",
            },
          })}
          className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
          placeholder="Ваш логин"
        />
        <ErrorsSpan errors={errors?.email} className="errors-span" />
      </div>

      <div className="content-center relative">
        <FormIcon error={errors?.password} />
        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
          Пароль
        </label>
        <input
          {...register("password", {
           required: "Обязательное поле!",
            minLength: {
              value: 5,
              message: "Минимум 5 символов!",
            },
            maxLength: {
              value: 100,
              message: "Максимум 100 символов!",
            },
          })}
          className="content-center w-full  text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
          type="password"
          placeholder="Введите ваш пароль"
        />
        <ErrorsSpan errors={errors?.password} className="errors-span" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label className="ml-2 block text-sm text-gray-900">Запомнить</label>
          <input
            {...register("remember_me")}
            className="ml-2 h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
            value="remember_me"
            type="checkbox"
          />
        </div>

        <div className="text-sm">
          <Link to="/" className="text-indigo-400 hover:text-blue-500">
            Забыли свой пароль?
          </Link>
        </div>
      </div>
      <div>
        <button
          className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
          type="submit"
        >
          Войти
        </button>
      </div>
      <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
        <span>Нет учетной записи?</span>
        <Link
          className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
          to="/registration"
        >
          Регистрация{" "}
        </Link>
      </p>
    </form>
  );
};
export { LoginForm };
