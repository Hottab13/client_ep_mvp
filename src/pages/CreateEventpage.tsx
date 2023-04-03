import moment from "moment";
import "moment/locale/ru";
import { ChangeEvent } from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { CreateEventForm } from "../components/CreateEventComponent/CreateEventForm";
import { useAppDispatch } from "../hook";
import { createEvent, uploadPhotoEvent } from "../redux/slices/eventsSlice";
import { EventProfile } from "../types/EventTypes";

const CreateEventPage:React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<EventProfile>({
    mode: "onBlur",
  });
  const [picture, setPicture] = useState<string|null>(null);
  const [pictureSubmit, setPictureSubmit] = useState<File|null>(null);
  const onChangePicture = (event:ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setPicture(URL.createObjectURL(file));
    setPictureSubmit(file);
  };
  const handleCreateEvent: SubmitHandler<EventProfile> = (data) => {
    const startDate = moment(data.startDate).add(data.startTime).toDate();
    const endDate = moment(data.endDate).add(data.endTime).toDate();
    const resData = {
      startDate,
      endDate,
      name: data.name,
      about: data.about,
      amountMaximum: data.amountMaximum,
      type:data.type,
      city:data.city,
      address:data.address,
    };
    if (pictureSubmit) {
      const formData = new FormData();
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
      }
      dispatch(createEvent(resData)); 
      dispatch(uploadPhotoEvent({formData}));
      setPicture(null);
      setPictureSubmit(null);
      reset();
    }else{
      dispatch(createEvent(resData));
      reset();
    }
  };
  return (
    <div className="flex items-center justify-center p-12 bg-gray-100 ">
      <div className="mx-auto w-full max-w-[550px]">
        <CreateEventForm
          handleCreateEvent={handleCreateEvent}
          onChangePicture={onChangePicture}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          picture={picture}
          watch={watch}
        />
      </div>
    </div>
  );
};
export { CreateEventPage };
