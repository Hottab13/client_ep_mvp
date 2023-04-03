import moment from "moment";
import { ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";

import Ava from "../../../assets/images/ava.png";
import { _arrayBufferToBase64 } from "../../../utils/arrayBufferToBase64";
import { useAppDispatch } from "../../../hook";
import { UserData } from "../../../types/UserTypes";
import { uploadPhotoProfileAva } from "../../../redux/slices/authSlice";
import { ImageUserType } from "../../../types/EventTypes";
import { ErrorsSpan } from "../../ErrorsSpan";

interface ProfileCardProps {
  userData: UserData;
  imgUser: ImageUserType | null;
  isOwner: boolean;
}
const ProfileCard: React.FC<ProfileCardProps> = ({
  userData,
  imgUser,
  isOwner,
}) => {
  const dispatch = useAppDispatch();
  const inputFile = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if (inputFile.current) inputFile.current.click();
  };
  const {
    register,
    setError,
    formState: { errors },
  } = useForm();

  const onChangePicture = (event: ChangeEvent) => {
    const formData = new FormData();
    const target = event.target as HTMLInputElement;
    const pictureSubmit: File = (target.files as FileList)[0];
    formData.append("fileUser", pictureSubmit as File);
    const isJpgOrPng =
      pictureSubmit?.type === "image/jpeg" ||
      pictureSubmit?.type === "image/png";
    const isLt2M = pictureSubmit?.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      setError("userPhoto", {
        type: "filetype",
        message: "Вы можете загружать только файлы JPG/PNG!",
      });
    } else if (!isLt2M) {
      setError("userPhoto", {
        type: "filetype",
        message: "Изображение должно быть меньше 2MB!",
      });
    } else {
      dispatch(uploadPhotoProfileAva(formData));
    }
  };
  return (
    <div className="bg-white p-3  rounded-lg mb-4 shadow-lg hover:shadow-xl border-t-4  border-indigo-500">
      <div className="image overflow-hidden">
        {imgUser ? (
          <img
            onClick={onButtonClick}
            className="object-cover"
            src={`data:image/jpg;base64,${_arrayBufferToBase64(
              imgUser.img_1000_1000?.data.data,
            )}`}
            alt={userData.data.userName}
          />
        ) : (
          <img
            onClick={onButtonClick}
            className="object-cover"
            src={Ava}
            alt={userData.data.userName}
          />
        )}
      </div>
      {isOwner && (
        <>
          <input
            {...register("userPhoto")}
            type="file"
            ref={inputFile}
            onChange={onChangePicture}
            style={{ display: "none" }}
          />
          <ErrorsSpan errors={errors?.userPhoto} className="errors-span" />
        </>
      )}
      <h1 className=" text-gray-900 font-bold text-xl leading-8 my-1 overflow-hidden">
        {(userData?.data?.userName || "") +
          " " +
          (userData?.data?.userSurname || " ")}
      </h1>
      <h3 className="text-gray-600 font-lg text-semibold leading-6 ">
        {userData.data.aboutMe}
      </h3>
      <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
        <li className="flex items-center py-3">
          <span>Статус</span>
          <span className="ml-auto">
            <span className="bg-indigo-500 py-1 px-2 rounded text-white text-sm">
              Online
            </span>
          </span>
        </li>
        <li className="flex items-center py-3 overflow-hidden">
          <span>Создан</span>
          <span className="ml-auto">
            {moment.utc(userData.createdAt).format("YYYY/MM/DD")}
          </span>
        </li>
      </ul>
    </div>
  );
};
export { ProfileCard };
