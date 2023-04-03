import moment from "moment";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "../../../hook";

import { uploadDataUserProfile } from "../../../redux/slices/authSlice";
import { DataInfo, UserData } from "../../../types/UserTypes";

import { ErrorsSpan } from "../../ErrorsSpan";

type BlockParameterFormProps = {
  children: ReactNode;
  name: string;
};
const BlockParameterForm = ({ children, name }: BlockParameterFormProps) => (
  <div className="grid grid-cols-2">
    <label className="px-4 py-2 font-semibold">{name}</label>
    {children || " "}
  </div>
);

type AboutSectionFormProps = {
  userData: UserData;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: boolean;
};
const AboutSectionForm: React.FC<AboutSectionFormProps> = ({
  userData,
  setEditMode,
  editMode,
}) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataInfo>({
    mode: "onBlur",
    defaultValues: {
      userName: userData.data.userName,
      userSurname: userData.data.userSurname,
      userGender: userData.data.userGender,
      userPhone: userData.data.userPhone,
      usersDateBirth: moment
        .utc(userData.data.usersDateBirth)
        .format("YYYY-MM-DD"),
    },
  });
  const handleUserProfile: SubmitHandler<DataInfo> = async (data) => {
    dispatch(uploadDataUserProfile(data));
  };
  return (
    <form onSubmit={handleSubmit(handleUserProfile)} autoComplete="off">
      <div className="grid md:grid-cols-2 text-sm text-gray-700">
        <BlockParameterForm name={"Имя"}>
          <input
            {...register("userName", {
              minLength: {
                value: 5,
                message: "Минимум 5 символов!",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов!",
              },
            })}
            className="input-about"
          />
          <ErrorsSpan errors={errors?.userName} className="errors-span" />
        </BlockParameterForm>
        <BlockParameterForm name={"Фамилия"}>
          <input
            {...register("userSurname", {
              minLength: {
                value: 3,
                message: "Минимум 3 символов!",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов!",
              },
            })}
            className="input-about"
          />
          <ErrorsSpan errors={errors?.userSurname} className="errors-span" />
        </BlockParameterForm>
        <BlockParameterForm name={"Пол"}>
          <select {...register("userGender")} className="input-about">
            <option value=""></option>
            <option value={"men"}>Мужской</option>
            <option value={"women"}>Женский</option>
          </select>
          <ErrorsSpan errors={errors?.userGender} className="errors-span" />
        </BlockParameterForm>
        <BlockParameterForm name={"Контактный но."}>
          <input
            {...register("userPhone", {
              pattern:
                /^\+?([0-9]{1})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/i,
            })}
            className="input-about"
            placeholder="+X-XXX--XXX-XX-XX"
          />
          <ErrorsSpan errors={errors?.userPhone} className="errors-span" />
        </BlockParameterForm>
        <BlockParameterForm name={"Дата рождения:"}>
          <input
            {...register("usersDateBirth", {})}
            className="input-about"
            type="date"
          />
        </BlockParameterForm>
        <BlockParameterForm name={"Email"}>
          <div className="px-4 py-2">
            <a className="text-blue-800" href={`mailto:${userData.email}`}>
              {userData.email}
            </a>
          </div>
        </BlockParameterForm>
      </div>
      <div>
        <button
          type="submit"
          className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-1"
        >
          Сохрантиь
        </button>
        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-1"
        >
          Отмена
        </button>
      </div>
    </form>
  );
};
export default AboutSectionForm;
