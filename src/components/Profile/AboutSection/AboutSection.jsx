import moment from "moment";
import { useState } from "react";

import AboutSectionForm from "../AboutSectionForm";

const AboutSection = ({ userData, isOwner }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="bg-white p-3  shadow-sm rounded-lg mb-4">
      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
        <span clas="text-green-500">
          <svg
            className="h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <span className="tracking-wide">Обо мне</span>
      </div>
      {editMode ? (
        <AboutSectionForm
          userData={userData}
          setEditMode={setEditMode}
          editMode={editMode}
        />
      ) : (
        <div className="text-gray-700">
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Имя</div>
              <div className="px-4 py-2">{userData?.data?.userName || " "}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Фамилия</div>
              <div className="px-4 py-2">
                {userData.data?.userSurname || " "}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Пол</div>
              <div className="px-4 py-2">
                {userData.data?.userGender === "men" && "Мужской"}
                {userData.data?.userGender === "women" && "Женский"}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Контактный но.</div>
              <div className="px-4 py-2">
                {userData.data?.userPhone
                  ? userData?.data.userPhone
                  : "+X-XXX--XXX-XX-XX"}
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email.</div>
              <div className="px-4 py-2">
                <a className="text-blue-800" href={`mailto:${userData?.email}`}>
                  {userData?.email}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Дата рождения:</div>
              <div className="px-4 py-2">
                {moment
                  .utc(userData.data.usersDateBirth || new Date())
                  .format("MMMM Do YYYY")}
              </div>
            </div>
          </div>
          {isOwner && (
            <div>
              <button
                className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-1"
                onClick={() => setEditMode(!editMode)}
              >
                Редактировтаь информацию
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export { AboutSection };
