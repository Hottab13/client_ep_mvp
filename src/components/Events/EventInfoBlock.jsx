import { EventCountdownTimer } from "./EventCountdownTimer";

const EventInfoBlock = ({ _id, u_id, type, name, users, startDate, endDate }) => (
  <div className="p-4">
    <h2 className="tracking-widest text-xs title-font font-bold text-green-400 mb-1 uppercase ">
      {type}
    </h2>
    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
      {name}
    </h1>
    <div className="flex items-center flex-wrap ">
      <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
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
    <div className="flex items-center flex-wrap"></div>
    <EventCountdownTimer startDate={startDate} endDate={endDate} />
  </div>
);
export { EventInfoBlock };
