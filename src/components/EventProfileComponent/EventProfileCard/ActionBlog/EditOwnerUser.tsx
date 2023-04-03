import { useState } from "react";
import "moment/locale/ru";

import { deleteEvent } from "../../../../redux/slices/eventsSlice";
import { EventProfile } from "../../../../types/EventTypes";
import { useAppDispatch } from "../../../../hook";

import { EditOwnerUserForm } from "./EditOwnerUserForm";

interface EditOwnerUserProps{
  eventProfile:EventProfile
}
const EditOwnerUser:React.FC<EditOwnerUserProps> = ({ eventProfile }) => {
  const [isOpenDeleteEv, setIsOpenDeleteEv] = useState(false);
  const [isOpenEditEv, setIsOpenEditEv] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center space-x-4 mt-2">
      {isOpenEditEv && (
        <EditOwnerUserForm
          setIsOpenEditEv={setIsOpenEditEv}
          isOpenEditEv={isOpenEditEv}
          eventProfile={eventProfile}
        />
      )}
      {isOpenDeleteEv && (
        <div className=" flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className=" fixed inset-0 bg-gray-800 opacity-25"></div>
          <div className="bg-white px-16 py-14 rounded-md text-center z-50">
            <h1 className="text-xl mb-4 font-bold text-slate-500">
              Действительно удалить событие?
            </h1>
            <button
              onClick={() => setIsOpenDeleteEv(!isOpenDeleteEv)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-md text-white"
            >
              Отмена
            </button>
            <button
              onClick={() => dispatch(deleteEvent())}
              className="bg-indigo-500 hover:bg-indigo-600 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            >
              Ok
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpenEditEv(!isOpenEditEv)}
        className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-gray-100 px-4 py-2 rounded text-sm space-x-3 transition duration-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 21 21"
          //strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>Редактировать</span>
      </button>
      <button
        onClick={() => setIsOpenDeleteEv(!isOpenDeleteEv)}
        className="flex items-center bg-red-500 hover:bg-red-600 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span>Удалить</span>
      </button>
    </div>
  );
};

const EndEvent = () => {
  return (
    <button className="flex items-center bg-red-500 hover:bg-red-600 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span>Завершить</span>
    </button>
  );
};
export { EditOwnerUser, EndEvent };
