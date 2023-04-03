import moment, { DurationInputArg1 } from "moment";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "../../../../hook";
import { editEventData } from "../../../../redux/slices/eventsSlice";
import { EventProfile } from "../../../../types/EventTypes";
import { ErrorsSpan } from "../../../ErrorsSpan";

interface EditOwnerUserFormProps{
  setIsOpenEditEv:Dispatch<SetStateAction<boolean>>;
  isOpenEditEv:boolean
  eventProfile:EventProfile
}
const EditOwnerUserForm:React.FC<EditOwnerUserFormProps> = ({ setIsOpenEditEv, isOpenEditEv, eventProfile }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EventProfile>({
    mode: "onBlur",
    defaultValues: {
      name: eventProfile.name,
      about: eventProfile.about,
      city: eventProfile.city,
      address: eventProfile.address,
      type: eventProfile.type,
      amountMaximum: eventProfile.amountMaximum,
      startDate: moment.utc(eventProfile.startDate).format("YYYY-MM-DD"),
      endDate: moment.utc(eventProfile.endDate).format("YYYY-MM-DD"),
    },
  });
  const handleEditEvent: SubmitHandler<EventProfile> = (data) => {
    const startDate = moment(data.startDate).add(data.startTime).toDate();
    const endDate = moment(data.endDate).add(data.endTime).toDate();
    const dtos = {
      startDate,
      endDate,
      about: data.about,
      address: data.address,
      city: data.city,
      name: data.name,
      type: data.type,
      amountMaximum: data.amountMaximum,
    };
    dispatch(editEventData(dtos));
  };
  return (
    <div className=" flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 ">
      <div className=" fixed inset-0 bg-gray-800 opacity-25"></div>
      <div className="bg-white px-16 py-14 rounded-md text-center z-50">
        <form onSubmit={handleSubmit(handleEditEvent)} autoComplete="off">
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 mb-5">
              <label className="create-event-label">
                Название
                <input
                  {...register("name", {
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
                  className="create-event-input"
                  placeholder="Название события"
                />
              </label>
              <ErrorsSpan errors={errors?.name} className="errors-span" />
            </div>
            <div className="w-full px-3 mb-5">
              <label className="create-event-label">
                Описание
                <textarea
                  {...register("about", {
                    maxLength: {
                      value: 1000,
                      message: "Максимум 1000 символов!",
                    },
                  })}
                  className="create-event-input"
                  placeholder="Описание события"
                />
              </label>
              <ErrorsSpan errors={errors?.about} className="errors-span" />
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className=" mb-5">
                <label className="create-event-label">
                  Город
                  <select
                    {...register("city", {
                      required: "Обязательное поле!",
                    })}
                    className="appearance-none create-event-input"
                  >
                    <option value="Саранск">Саранск</option>
                    <option value="Москва">Москва</option>
                    <option value="Санкт-Петербург">Санкт-Петербург</option>
                    <option value="Другое">Другое</option>
                  </select>
                </label>
                <ErrorsSpan
                  errors={errors?.city}
                  className="errors-span"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className=" mb-5">
                <label className="create-event-label">
                  Адрес
                  <input
                    {...register("address", {
                      required: "Обязательное поле!",
                    })}
                    className="appearance-none create-event-input"
                    placeholder="ул., д."
                  />
                </label>
                <ErrorsSpan
                  errors={errors?.address}
                  className="errors-span"
                />
              </div>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className=" mb-5">
                <label className="create-event-label">
                  Тип события
                  <select
                    {...register("type", {
                      required: "Обязательное поле!",
                    })}
                    className="appearance-none create-event-input"
                  >
                    <option value="Активный отдых">Активный отдых</option>
                    <option value="Релакс">Релакс</option>
                    <option value="Другое">Другое</option>
                  </select>
                </label>
                <ErrorsSpan
                  errors={errors?.type}
                  className="errors-span"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className=" mb-5">
                <label className="create-event-label">
                  Ограничение участников?
                  <input
                    {...register("amountMaximum", {
                      required: "Обязательное поле!",
                      min: {
                        value: 1,
                        message: "Значение не может быть менее 1!",
                      },
                    })}
                    className="appearance-none create-event-input"
                    type="number"
                    placeholder="5"
                  />
                </label>
                <ErrorsSpan
                  errors={errors?.amountMaximum}
                  className="errors-span"
                />
              </div>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className=" mb-5">
                <label className="create-event-label">
                  Начало события
                  <input
                    {...register("startDate", {
                      required: "Обязательное поле!",
                      validate: (val) => {
                        if (new Date().valueOf() >= val.valueOf()) {
                          return "Дата начала не может быть раньше сегодняшнего дня!";
                        }
                      },
                    })}
                    className="create-event-input"
                    type="date"
                  />
                </label>
                <ErrorsSpan
                  errors={errors?.startDate}
                  className="errors-span"
                />
              </div>
            </div>

            <div className="w-full px-3 sm:w-1/2">
              <div className=" mb-5">
                <label className="create-event-label">
                  Время
                  <input
                    {...register("startTime", {
                      required: "Обязательное поле!",
                    })}
                    className="create-event-input"
                    type="time"
                  />
                </label>
                <ErrorsSpan
                  errors={errors?.startTime}
                  className="errors-span"
                />
              </div>
            </div>

            <div className="w-full px-3 sm:w-1/2">
              <div className=" mb-5">
                <label className="create-event-label">
                  Завершение события
                  <input
                    {...register("endDate", {
                      required: "Обязательное поле!",
                      validate: (val) => {
                        if (watch("startDate").valueOf() >= val.valueOf()) {
                          return "Дата окончания не может быть раньше даты начала!";
                        }
                      },
                    })}
                    className="create-event-input"
                    type="date"
                  />
                </label>
                <ErrorsSpan errors={errors?.endDate} className="errors-span" />
              </div>
            </div>

            <div className="w-full px-3 sm:w-1/2">
              <div className=" mb-5">
                <label className="create-event-label">
                  Время
                  <input
                    {...register("endTime", {
                      required: "Обязательное поле!",
                    })}
                    className="create-event-input"
                    type="time"
                  />
                </label>
                <ErrorsSpan errors={errors?.endTime} className="errors-span" />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => setIsOpenEditEv(!isOpenEditEv)}
              className="bg-red-500 hover:bg-red-600 px-7 py-2 rounded-md text-md text-white"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2 ml-2 rounded-md text-md text-white font-semibold"
            >
              Изменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export { EditOwnerUserForm };
