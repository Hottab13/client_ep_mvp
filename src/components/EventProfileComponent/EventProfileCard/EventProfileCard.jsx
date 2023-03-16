import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Banner_1 from "../../../assets/images/jorg-angeli-CAMwIxYk5Xg-unsplash.jpg";
import Ava from "../../../assets/images/ava.png";
import { uploadPhotoEvent } from "../../../redux/slices/eventsSlice";
import { _arrayBufferToBase64 } from "../../../utils/arrayBufferToBase64";

import { ActionBlog } from "./ActionBlog/ActionBlog";

const ErrorsSpan = ({ errors, className }) =>
  errors && <span className={className}>{errors?.message || "Ошибка!"}</span>;



const EventProfileCard = ({ eventProfile, eventImg, user_id, isAuth }) => {
  const {
    register,
    setError,
    formState: { errors },
  } = useForm();
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const onButtonClick = () => {
    inputFile.current.click();
  };
  const onChangePicture = (e) => {
    const formData = new FormData();
    const pictureSubmit = e.target.files[0];
    formData.append("fileEvent", pictureSubmit);
    const isJpgOrPng =
        pictureSubmit?.type === "image/jpeg" ||
        pictureSubmit?.type === "image/png";
      const isLt2M = pictureSubmit?.size / 1024 / 1024 < 2;
      if (!isJpgOrPng) {
        setError("eventPhoto", {
          type: "filetype",
          message: "Вы можете загружать только файлы JPG/PNG!",
        });
      } else if (!isLt2M) {
        setError("eventPhoto", {
          type: "filetype",
          message: "Изображение должно быть меньше 2MB!",
        });
      } else{
        dispatch(uploadPhotoEvent({ formData }));
      }
  };
  return (
    <div className="bg-white rounded-lg shadow-xl pb-8">
      <div className="w-full h-100">
        <img
          src={Banner_1}
          className="w-full h-full rounded-tl-lg rounded-tr-lg "
          alt="Banner"
        />
      </div>
      <div className="flex flex-col items-center -mt-20">
        {eventImg ? (
          <img
            onClick={onButtonClick}
            className="w-60 border-4 border-white rounded-full transition duration-200 transform hover:scale-110"
            src={`data:image/jpg;base64,${_arrayBufferToBase64(
              eventImg?.img_1000_1000?.data?.data
            )}`}
            alt={eventProfile.name}
          />
        ) : (
          <img
            onClick={onButtonClick}
            className="w-60 border-4 border-white rounded-full"
            src={Ava}
            alt={eventProfile.name}
          />
        )} 
        {eventProfile.ownerUser === user_id&&(
          <>
          <input
          {...register("eventPhoto")}
          type="file"
          ref={inputFile}
          onChange={onChangePicture}
          style={{ display: "none" }}
        />
        <ErrorsSpan errors={errors?.eventPhoto} className="errors-span" />
        </>
        )}
        
        <div className="flex items-center space-x-2 mt-2">
        
          <p className="text-2xl">{eventProfile.name}</p>
          <span className="bg-blue-500 rounded-full p-1" title="Verified">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-gray-100 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </div>
        <h2 className="tracking-widest text-xs title-font font-bold text-green-400 mb-1 uppercase ">
          {eventProfile.type}
        </h2>
        <p className="text-sm text-gray-500">
          {eventProfile.city + " " + eventProfile.address}
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
        {isAuth && <ActionBlog eventProfile={eventProfile} user_id={user_id} />}
      </div>
    </div>
  );
};
export { EventProfileCard };
