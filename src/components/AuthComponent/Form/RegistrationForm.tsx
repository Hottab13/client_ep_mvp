import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../../hook";
import { registrationUser } from "../../../redux/slices/authSlice";
import { RegistrationUserProps } from "../../../types/UserTypes";
import { ErrorsSpan } from "../../ErrorsSpan";
import { FormIcon } from "../FormIcon";

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegistrationUserProps>({
    mode: "onBlur",
  });
  const handleRegistration: SubmitHandler<RegistrationUserProps> = (data) => {
    dispatch(registrationUser(data));
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(handleRegistration)}
      autoComplete="off"
      className="mt-8 space-y-6"
    >
      <div className="relative">
        <FormIcon error={errors?.userName} />
        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
          User Name
        </label>
        <input
          {...register("userName", {
            required: "Обязательное поле!",
            minLength: {
              value: 5,
              message: "Минимум 5 символов!",
            },
            maxLength: {
              value: 50,
              message: "Максимум 50 символов!",
            },
          })}
          className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
          placeholder="Придумайте ваше имя"
        />
        <ErrorsSpan errors={errors?.userName} className="errors-span" />
      </div>

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
              value: 50,
              message: "Максимум 50 символов!",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Некоректный email",
            },
          })}
          className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
          placeholder="Ваша элеткронная почта"
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
          className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
          type="password"
          placeholder="Придумайте пароль"
        />
        <ErrorsSpan errors={errors?.password} className="errors-span" />
      </div>

      <div className="mt-8 content-center relative">
        <FormIcon error={errors?.confirm_password} />
        <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
          Повторите пароль
        </label>
        <input
          {...register("confirm_password", {
            required: "Обязательное поле!",
            minLength: {
              value: 5,
              message: "Минимум 5 символов!",
            },
            maxLength: {
              value: 100,
              message: "Максимум 100 символов!",
            },
            validate: (val) => {
              if (watch("password") !== val) {
                return "Ваши пароли не совпадают";
              }
            },
          })}
          className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
          type="password"
          placeholder="Повторите пароль"
        />
        <ErrorsSpan errors={errors?.confirm_password} className="errors-span" />
      </div>

      <div>
        <button
          className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
          type="submit"
        >
          Регистрация
        </button>
      </div>
      <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
        <span>Уже есть аккаунт?</span>
        <Link
          className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
          to={"/login"}
        >
          Вход{" "}
        </Link>
      </p>
    </form>
  );
};
export { RegistrationForm };
