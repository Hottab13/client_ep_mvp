import { ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "../../../hook";
import { IconEventName } from "../../../assets/icon/EventProfileIcon";
import Banner_1 from "../../../assets/images/jorg-angeli-CAMwIxYk5Xg-unsplash.jpg";
import Ava from "../../../assets/images/ava.png";
import { uploadPhotoEvent } from "../../../redux/slices/eventsSlice";
import { _arrayBufferToBase64 } from "../../../utils/arrayBufferToBase64";
import { ErrorsSpan } from "../../ErrorsSpan";
import { EventProfile, ImageEventType } from "../../../types/EventTypes";

import { ActionBlog } from "./ActionBlog/ActionBlog";

interface EventProfileCardProps {
  eventProfile: EventProfile | null;
  eventImg: ImageEventType | null;
  user_id: string | undefined;
  isAuth: boolean;
}
const EventProfileCard: React.FC<EventProfileCardProps> = ({
  eventProfile,
  eventImg,
  user_id,
  isAuth,
}) => {
  const dispatch = useAppDispatch();
  const {
    register,
    setError,
    formState: { errors },
  } = useForm();
  const inputFile = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if (inputFile.current) inputFile.current.click();
  };
  const onChangePicture = (event: ChangeEvent) => {
    const formData = new FormData();
    const target = event.target as HTMLInputElement;
    const pictureSubmit: File = (target.files as FileList)[0];
    formData.append("fileEvent", pictureSubmit as File);
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
    } else {
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
            alt={eventProfile?.name || "eventPhoto"}
          />
        ) : (
          <img
            onClick={onButtonClick}
            className="w-60 border-4 border-white rounded-full"
            src={Ava}
            alt={eventProfile?.name || "eventPhoto"}
          />
        )}
        {eventProfile?.ownerUser === user_id && (
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
          <p className="text-2xl">{eventProfile?.name}</p>
          <span className="bg-blue-500 rounded-full p-1" title="Verified">
            <IconEventName />
          </span>
        </div>
        <h2 className="tracking-widest text-xs title-font font-bold text-green-400 mb-1 uppercase ">
          {eventProfile?.type}
        </h2>
        <p className="text-sm text-gray-500">
          {eventProfile?.city + " " + eventProfile?.address}
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
        {isAuth && <ActionBlog eventProfile={eventProfile} user_id={user_id} />}
      </div>
    </div>
  );
};
export { EventProfileCard };
