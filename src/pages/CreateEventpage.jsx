import moment from "moment";
import "moment/locale/ru";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { CreateEventForm } from "../components/CreateEventComponent/CreateEventForm";
import { createEvent } from "../redux/slices/eventsSlice";

const CreateEventPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const [picture, setPicture] = useState(null);
  const [pictureSubmit, setPictureSubmit] = useState(null);

  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setPictureSubmit(e.target.files[0]);
  };

  const handleCreateEvent = (data) => {
    const startDate = moment(data.startDate).add(data.startTime).toDate();
    const endDate = moment(data.endDate).add(data.endTime).toDate();
    const resData = {
      startDate,
      endDate,
      name: data.eventName,
      about: data.eventAbout,
      amountMaximum: data.participantRestriction,
      type:data.eventType,
      city:data.eventCity,
      address:data.eventAddress,
    };
    if (pictureSubmit) {
      const formData = new FormData();
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
      }
      dispatch(createEvent({resData,formData}));
      setPicture(null);
      setPictureSubmit(null);
      reset();
    }else{
      dispatch(createEvent({resData}));
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
