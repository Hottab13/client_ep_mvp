import { Link } from "react-router-dom";

import EventProfile from "../../../../assets/images/event_profile_200_200.jpg";
import { _arrayBufferToBase64 } from "../../../../utils/arrayBufferToBase64";
import { BlockHeader } from "../BlockHeader";
import { EventCountdownTimer } from "../../../Events/EventCountdownTimer";
import { useCurrentTime } from "../../../../hook/useCurrentTime";

const UserEventsSection = ({ userEvents, userImgEvents, currentTime }) => (
  <div className="bg-white p-3 mb-4 rounded-lg shadow-lg hover:shadow-xl">
    <BlockHeader
      d={
        "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      }
    >
      Мои события
    </BlockHeader>

    <section className="text-gray-900 body-font pt-2">
      <div className="container p-2 pt-2 mx-auto grid justify-items-stretch">
        <div className="flex flex-wrap -m-4">
          {userEvents.map(({ _id, name, type, users, startDate, endDate }) => (
            <div key={_id} className="p-1 w-1/3 md:w-1/4 ">
              <div
                className={
                  Math.floor(new Date(endDate).valueOf()) <= currentTime
                    ? "border-red-300 bg-red-100 h-full border-2 border-opacity-60 rounded-lg overflow-hidden hover:shadow-2xl"
                    : Math.floor(new Date(startDate).valueOf()) <= currentTime
                    ? "border-green-300 bg-green-100 h-full border-2 border-opacity-60 rounded-lg overflow-hidden hover:shadow-2xl"
                    : "border-gray-200 bg-white h-full border-2 border-opacity-60 rounded-lg overflow-hidden hover:shadow-2xl"
                }
              >
                <Link to={`/event/${_id}`}>
                  {userImgEvents.find((e) => _id === e.event) ? (
                    userImgEvents.map(
                      (e) =>
                        _id === e.event && (
                          <img
                            key={e._id}
                            className="aspect-square"
                            src={`data:image/jpg;base64,${_arrayBufferToBase64(
                              e?.img_200_200.data.data
                            )}`}
                            alt={name}
                          />
                        )
                    )
                  ) : (
                    <img
                      className="aspect-square"
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                        />
                      </svg>

                      {users.length}
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
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
          ))}
        </div>
      </div>
    </section>
  </div>
);
export { UserEventsSection };
