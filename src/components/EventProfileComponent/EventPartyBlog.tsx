import { Link } from "react-router-dom";

import { EventProfileData } from "../../types/EventTypes";
import { _arrayBufferToBase64 } from "../../utils/arrayBufferToBase64";

interface EventPartyBlogProps {
  eventProfileData: EventProfileData;
  user_id: string | undefined;
}
const EventPartyBlog: React.FC<EventPartyBlogProps> = ({
  eventProfileData,
  user_id,
}) => (
  <div className="bg-white rounded-lg shadow-xl p-8">
    <div className="flex items-center justify-between">
      <h4 className="text-xl text-gray-900 font-bold">
        Участники ({eventProfileData.eventProfile?.users?.length})
      </h4>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8 mt-8">
      {eventProfileData.eventProfile?.users?.map((u) => (
        <Link
          key={u}
          to={user_id === u ? "/profile/" : `/profile/${u}`}
          className="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
          title="View Profile"
        >
          {eventProfileData.partyUsersImg &&
            eventProfileData.partyUsersImg.map(
              (img) =>
                img.user === u && (
                  <img
                    key={img.user}
                    className="w-16 rounded-full"
                    src={`data:image/jpg;base64,${_arrayBufferToBase64(
                      img.img_200_200 && img.img_200_200.data.data
                    )}`}
                    alt={img.user}
                  />
                )
            )}
          {eventProfileData.partyUsers &&
            eventProfileData.partyUsers.map(
              (party) =>
                party._id === u && (
                  <p
                    key={party._id}
                    className="text-center font-bold text-sm mt-1"
                  >
                    {party.data.userName}
                  </p>
                )
            )}
          <p className="text-xs text-gray-500 text-center">{u}</p>
        </Link>
      ))}
    </div>
  </div>
);
export { EventPartyBlog };
