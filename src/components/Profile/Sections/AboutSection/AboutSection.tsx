import moment from "moment";
import { ReactNode } from "react";

import { useState } from "react";

import { UserData } from "../../../../types/UserTypes";

import AboutSectionForm from "../AboutSectionForm";
import { BlockHeader } from "../BlockHeader";

interface BlockParameterProps {
  children: ReactNode;
  name: string;
}

const BlockParameter: React.FC<BlockParameterProps> = ({ children, name }) => (
  <div className="grid grid-cols-2">
    <div className="py-2 px-4 font-semibold">{name + ":"}</div>
    <div className="overflow-hidden mx-2 md:px-1 py-2">{children || " "}</div>
  </div>
);

interface AboutSectionProps {
  userData: UserData;
  isOwner: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ userData, isOwner }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="bg-white p-3 rounded-lg mb-4 shadow-lg hover:shadow-xl">
      <BlockHeader
        d={
          "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        }
      >
        Обо мне
      </BlockHeader>
      {editMode ? (
        <AboutSectionForm
          userData={userData}
          setEditMode={setEditMode}
          editMode={editMode}
        />
      ) : (
        <div className="text-gray-700">
          <div className="grid md:grid-cols-2 text-sm">
            <BlockParameter name={"Имя"}>
              {userData.data.userName}
            </BlockParameter>
            <BlockParameter name={"Фамилия"}>
              {userData.data.userSurname}
            </BlockParameter>
            <BlockParameter name={"Пол"}>
              {userData.data.userGender === "men" && "Мужской"}
              {userData.data.userGender === "women" && "Женский"}
            </BlockParameter>
            <BlockParameter name={"Контактный но."}>
              {userData.data.userPhone
                ? userData.data.userPhone
                : "+X-XXX--XXX-XX-XX"}
            </BlockParameter>
            <BlockParameter name={"Дата рождения"}>
              {moment
                .utc(userData.data.usersDateBirth || new Date())
                .format("MMMM Do YYYY")}
            </BlockParameter>
            <BlockParameter name={"Email"}>
              <a className="text-blue-800" href={`mailto:${userData.email}`}>
                {userData.email}
              </a>
            </BlockParameter>
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
