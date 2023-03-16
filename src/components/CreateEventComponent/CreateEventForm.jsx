import { ErrorsSpan } from "../ErrorsSpan";

const CreateEventForm = ({
  handleCreateEvent,
  onChangePicture,
  handleSubmit,
  register,
  errors,
  watch,
  picture,
}) => (
  <form onSubmit={handleSubmit(handleCreateEvent)} autoComplete="off">
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full px-3 mb-5">
        <label className="create-event-label">
          Название
          <input
            {...register("eventName", {
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
        <ErrorsSpan errors={errors?.eventName} className="errors-span" />
      </div>
      <div className="w-full px-3 mb-5">
        <label className="create-event-label">
          Описание
          <textarea
            {...register("eventAbout", {
              maxLength: {
                value: 1000,
                message: "Максимум 1000 символов!",
              },
            })}
            className="create-event-input"
            placeholder="Описание события"
          />
        </label>
        <ErrorsSpan errors={errors?.eventAbout} className="errors-span" />
      </div>
    </div>

    <div className="-mx-3 flex flex-wrap">
      <div className="w-full px-3 sm:w-1/2">
        <div className=" mb-5">
          <label className="create-event-label">
            Город
            <select
              {...register("eventCity", {
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
          <ErrorsSpan errors={errors?.eventCity} className="errors-span" />
        </div>
      </div>
      <div className="w-full px-3 sm:w-1/2">
        <div className=" mb-5">
          <label className="create-event-label">
            Адрес
            <input
              {...register("eventAddress", {
                required: "Обязательное поле!",
              })}
              type="text"
              className="appearance-none create-event-input"
              placeholder="ул., д."
            />
          </label>
          <ErrorsSpan errors={errors?.eventAddress} className="errors-span" />
        </div>
      </div>
    </div>

    <div className="-mx-3 flex flex-wrap">
      <div className="w-full px-3 sm:w-1/2">
        <div className=" mb-5">
          <label className="create-event-label">
            Тип события
            <select
              {...register("eventType", {
                required: "Обязательное поле!",
              })}
              className="appearance-none create-event-input"
            >
              <option value="Активный отдых">Активный отдых</option>
              <option value="Релакс">Релакс</option>
              <option value="Другое">Другое</option>
            </select>
          </label>
          <ErrorsSpan errors={errors?.eventType} className="errors-span" />
        </div>
      </div>
      <div className="w-full px-3 sm:w-1/2">
        <div className=" mb-5">
          <label className="create-event-label">
            Ограничение участников?
            <input
              {...register("participantRestriction", {
                required: "Обязательное поле!",
                valueAsNumber: "Должно быть число!",
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
            errors={errors?.participantRestriction}
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
                valueAsDate: "Должна быть дата!",
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
          <ErrorsSpan errors={errors?.startDate} className="errors-span" />
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
          <ErrorsSpan errors={errors?.startTime} className="errors-span" />
        </div>
      </div>

      <div className="w-full px-3 sm:w-1/2">
        <div className=" mb-5">
          <label className="create-event-label">
            Завершение события
            <input
              {...register("endDate", {
                required: "Обязательное поле!",
                valueAsDate: "Должна быть дата!",
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
    {picture && (
      <div className="image flex flex-wrap items-center justify-center mb-5">
        <img className=" h-20 w-auto" src={picture && picture} alt="" />
      </div>
    )}
    
    <div className="w-full pb-3">
      <div className="flex items-center justify-center h-30 w-full">
        <label className="flex flex-col items-center justify-center w-full h-27 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-2 pb-3">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Нажмите, чтобы загрузить </span>
              фото профиля
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG (MAX. 2МБ.)
            </p>
          </div>
          <input
            type="file"
            {...register("eventPhoto")}
            className="hidden"
            onChange={onChangePicture}
          />
        </label>
        <ErrorsSpan errors={errors?.eventPhoto} className="errors-span" />
      </div>
    </div>

    <div>
      <button
        type="submit"
        className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        //disabled={!isValid}
      >
        Создать
      </button>
    </div>
  </form>
);
export { CreateEventForm };
