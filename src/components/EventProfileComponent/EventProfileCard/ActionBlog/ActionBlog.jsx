import { useDispatch } from "react-redux";

import { useCurrentTime } from "../../../../hook/useCurrentTime";

import {
  addUserIdEvent,
  delUserIdEvent,
} from "../../../../redux/slices/eventsSlice";

import { EditOwnerUser, EndEvent } from "./EditOwnerUser";

const ActionBlog = ({ eventProfile, user_id }) => {
  const inEventTime = Math.floor(
    new Date(eventProfile.startDate).valueOf()
  );
  const currentTime =  useCurrentTime();
  const dispatch = useDispatch(); 
  return (
    <>
      {inEventTime <= currentTime ? (
        eventProfile.ownerUser === user_id && (
          <EndEvent/>
        )
      ) : eventProfile.ownerUser === user_id ? (
        <EditOwnerUser eventProfile={eventProfile} />
      ) : eventProfile.users.find((u) => u === user_id) ? (
        <div className="flex items-center space-x-4 mt-2">
          <button
            onClick={() => dispatch(delUserIdEvent(user_id))}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
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
                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>

            <span>Отказаться</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4 mt-2">
          <button
            onClick={() => dispatch(addUserIdEvent(user_id))}
            disabled={eventProfile.amountMaximum <= 0}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 22"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
            <span>Участвовать</span>
          </button>
        </div>
      )}
    </>
  );
};
export { ActionBlog };
