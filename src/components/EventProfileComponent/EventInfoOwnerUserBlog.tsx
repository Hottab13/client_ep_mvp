import { ReactNode } from "react";

import { UserData } from "../../types/UserTypes";

interface LiItemElementProps {
  children: ReactNode;
  nameEl: string;
}
const LiItemElement = ({ children, nameEl }: LiItemElementProps) => (
  <li className="flex border-b py-2">
    <span className="font-bold w-34">{nameEl + ":"}</span>
    <span className="text-gray-700">{children}</span>
  </li>
);

interface EventInfoOwnerUserBlogProps {
  ownerUserData: UserData| null;
}
const EventInfoOwnerUserBlog: React.FC<EventInfoOwnerUserBlogProps> = ({
  ownerUserData,
}) => (
  <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
    <div className="w-full flex flex-col">
      <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
        <h4 className="text-xl text-gray-900 font-bold">Организатор</h4>
        <ul className="mt-2 text-gray-700">
          <LiItemElement nameEl={"Имя"}>
            {ownerUserData?.data.userName}
          </LiItemElement>
          <LiItemElement nameEl={"Фамилия"}>
            {ownerUserData?.data.userSurname}
          </LiItemElement>
          <LiItemElement nameEl={"Телефон"}>
            {ownerUserData?.data.userPhone}
          </LiItemElement>
        </ul>
      </div>
    </div>
  </div>
);
export { EventInfoOwnerUserBlog };
