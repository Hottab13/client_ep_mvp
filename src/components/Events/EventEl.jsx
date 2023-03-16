import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { EventInfoBlock } from "./EventInfoBlock";
import { ImgEventBlock } from "./ImgEventBlock";
import { UserInfoBlock } from "./UserInfoBlock";

const EventEl = ({ events }) => {
  const currentTime = Math.floor(new Date().valueOf() + 10800000);
  const { userData } = useSelector((state) => state.userProfileData || {});
  const { uniqueImgUsers, uniqueUsers, ImgEvents } = useSelector(
    (state) => state.events.eventsData || {}
  );
  return (
    <>
      {events
        //.slice(minValue, maxValue)
        .map(
          ({
            _id,
            name,
            imgAvatar,
            startDate,
            endDate,
            type,
            ownerUser,
            users,
          }) => (
            <div key={_id} className="p-3 md:w-1/5 ">
              <div
                className={
                  Math.floor(new Date(endDate).valueOf()) <= currentTime
                    ? "border-red-300 bg-red-100 h-full border-2 border-opacity-60 rounded-lg overflow-hidden hover:shadow-2xl"
                    : Math.floor(new Date(startDate).valueOf()) <= currentTime
                    ? "border-green-300 bg-green-100 h-full border-2 border-opacity-60 rounded-lg overflow-hidden hover:shadow-2xl"
                    : "border-gray-200 bg-white h-full border-2 border-opacity-60 rounded-lg overflow-hidden hover:shadow-2xl"
                }
              >
                <UserInfoBlock
                  uniqueImgUsers={uniqueImgUsers}
                  ownerUser={ownerUser}
                  uniqueUsers={uniqueUsers}
                  u_id={userData._id}
                  startDate={startDate}
                  endDate={endDate}
                />
                <Link to={`/event/${_id}`}>
                  <ImgEventBlock ImgEvents={ImgEvents} name={name} _id={_id} />
                </Link>
                <EventInfoBlock
                  startDate={startDate}
                  endDate={endDate}
                  type={type}
                  name={name}
                  _id={_id}
                  u_id={userData._id}
                  users={users}
                />
              </div>
            </div>
          )
        )}
    </>
  );
};
export { EventEl };
