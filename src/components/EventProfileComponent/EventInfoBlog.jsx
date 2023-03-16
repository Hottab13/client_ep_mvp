import moment from "moment";
import "moment/locale/ru";

const LiItemElement = ({ children, nameEl }) => (
  <li className="flex border-b py-2">
    <span className="font-bold w-34">{nameEl + ":"}</span>
    <span className="text-gray-700">{children}</span>
  </li>
);

const EventInfoBlog = ({ eventProfile }) => (
  <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
    <div className="w-full flex flex-col">

    <div className="flex flex-col w-full bg-white p-8 flex-1 rounded-lg shadow-xl mb-4">
        <h4 className="text-xl text-gray-900 font-bold">Описание</h4>
        <p className="mt-5 text-gray-700">
          {eventProfile.about}
        </p>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
        <h4 className="text-xl text-gray-900 font-bold">Информация</h4>
        <ul className="mt-2 text-gray-700">
          <LiItemElement nameEl={"Начало события"}>
            {moment
              .utc(eventProfile.startDate)
              .format("MMMM Do YYYY, h:mm:ss a")}
          </LiItemElement>
          <LiItemElement nameEl={"Окончание события"}>
            {moment
              .utc(eventProfile.endDate)
              .format("MMMM Do YYYY, h:mm:ss a")}
          </LiItemElement>
          <LiItemElement nameEl={"Создано"}>
            {moment
              .utc(eventProfile.createdAt)
              .format("MMMM Do YYYY, h:mm:ss a")}
          </LiItemElement>
          <LiItemElement nameEl={"Последнее обновление"}>
            {moment
              .utc(eventProfile.updatedAt)
              .format("MMMM Do YYYY, h:mm:ss a")}
          </LiItemElement>
          <LiItemElement nameEl={"Количество участников"}>
            {eventProfile.amountMaximum}
          </LiItemElement>
        </ul>
      </div>

      
    </div>
  </div>
);
export { EventInfoBlog };
