import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import EventProfile from "../assets/images/event_profile_200_200.jpg";
import { _arrayBufferToBase64 } from "../utils/arrayBufferToBase64";
import { useCurrentTime } from "../hook/useCurrentTime";
import {
  IconUsersQuantity,
  IconUsersСomments,
} from "../assets/icon/EventsSectionIcon";

import { EventCountdownTimer } from "./Events/EventCountdownTimer";
import { UserInfoBlock } from "./Events/UserInfoBlock";


const EventContainer = ({ children }) => (
  <section className="text-gray-600 body-font">
    <div className="container p-5 mx-auto">
      <div className="flex flex-wrap -m-4">{children}</div>
    </div>
  </section>
);

const EventsSection = ({ eventsData, ImgEvents, markupGrid, userData }) => {
  const currentTime = useCurrentTime();
const [page,setPage]=useState(1);

  const { uniqueImgUsers, uniqueUsers } = useSelector(
    (state) => state.events.eventsData || {}
  );
  return (
    <section className="text-gray-900 body-font pt-2">
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
      <nav className="w-max" >
		<ul className="inline-flex -space-x-px justify-center ">
			<li>
				<a href="#"
					className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
			</li>
			<li>
				<a href="#"
					className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
			</li>
			<li>
				<a href="#"
					className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
			</li>
			<li>
				<a href="#" aria-current="page"
					className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
			</li>
			<li>
				<a href="#"
					className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
			</li>
			<li>
				<a href="#"
					className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
			</li>
			<li>
				<a href="#"
					className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
			</li>
		</ul>
	</nav>
    </section>
  );
};
export { EventsSection };
