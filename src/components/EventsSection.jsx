import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import EventProfile from "../assets/images/event_profile_200_200.jpg";
import { _arrayBufferToBase64 } from "../utils/arrayBufferToBase64";
import { useCurrentTime } from "../hook/useCurrentTime";
import {
  IconUsersQuantity,
  IconUsersСomments,
} from "../assets/icon/EventsSectionIcon";

import { EventCountdownTimer } from "./Events/EventCountdownTimer";
import { UserInfoBlock } from "./Events/UserInfoBlock";

const EventsSection = ({ eventsData, ImgEvents, markupGrid, userData }) => {
  const currentTime = useCurrentTime();
  const { uniqueImgUsers, uniqueUsers } = useSelector(
    (state) => state.events.eventsData || {}
  );
  return (
    <div className="container p-5 pt-2 mx-auto grid justify-items-stretch">
      <div className="flex flex-wrap -m-4">
        {eventsData.map(
          ({ _id, name, type, users, startDate, endDate, ownerUser }) => (
            <div key={_id} className={`p-2 w-1/3 ${markupGrid} `}>
              <div
                className={
                  Math.floor(new Date(endDate).valueOf()) <= currentTime
                    ? "border-red-300 bg-red-100 h-full border-2 border-opacity-60 rounded-lg overflow-hidden hover:shadow-2xl"
                    : Math.floor(new Date(startDate).valueOf()) <= currentTime
                    ? "border-green-300 bg-green-100 h-full border-2 border-opacity-60 rounded-lg overflow-hidden hover:shadow-2xl"
                    : "border-gray-200 bg-white h-full border-2 border-opacity-60 rounded-lg overflow-hidden hover:shadow-2xl"
                }
              >
                {userData && (
                  <UserInfoBlock
                    uniqueImgUsers={uniqueImgUsers}
                    ownerUser={ownerUser}
                    uniqueUsers={uniqueUsers}
                    u_id={userData._id}
                    startDate={startDate}
                    endDate={endDate}
                  />
                )}

                <Link to={`/event/${_id}`}>
                  {ImgEvents.find((e) => _id === e.event) ? (
                    ImgEvents.map(
                      (e) =>
                        _id === e.event && (
                          <img
                            key={e._id}
                            className="lg:h-48 md:h-36 w-full object-cover object-center"
                            src={`data:image/jpg;base64,${_arrayBufferToBase64(
                              e?.img_200_200.data.data
                            )}`}
                            alt={name}
                          />
                        )
                    )
                  ) : (
                    <img
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      src={EventProfile}
                      alt="event_profil"
                    />
                  )}
                </Link>
                <div className="p-2">
                  <h2 className="tracking-widest text-xs title-font font-bold text-green-400 mb-1 uppercase ">
                    {type}
                  </h2>
                  <h1 className=" title-font text-lg font-medium text-gray-900 mb-3">
                    {name}
                  </h1>
                  <div className="flex items-center flex-wrap ">
                    <span className="text-gray-400">
                      {Math.floor(new Date(endDate).valueOf()) <= currentTime
                        ? "Завершилось"
                        : Math.floor(new Date(startDate).valueOf()) <=
                          currentTime
                        ? "Процесс..."
                        : "До начала"}
                    </span>
                    <span className="text-gray-400 mr-1 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-1 py-1 border-r-2 border-gray-200">
                      <IconUsersQuantity />
                      {users.length}
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <IconUsersСomments />
                      89
                    </span>
                  </div>
                  <EventCountdownTimer
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
export { EventsSection };
