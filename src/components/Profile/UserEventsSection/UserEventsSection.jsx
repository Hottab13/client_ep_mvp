import { Link } from "react-router-dom";

import Ava from "../../../assets/images/ava.png";
import { _arrayBufferToBase64 } from "../../../utils/arrayBufferToBase64";

import { EventInfoBlock } from "../../Events/EventInfoBlock";

const UserEventsSection = ({ userEvents, u_id }) => (
  <div className="bg-white p-3 shadow-sm rounded-lg ">
    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
      <span clas="text-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      </span>
      <span className="tracking-wide">Мои события</span>
    </div>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto grid justify-items-stretch">
        <div className="flex flex-wrap -m-4">
          {userEvents
            //.slice(minValue, maxValue)
            .map(({ _id, name, imgAvatar, dateOfTheEvent, type, users }) => (
              <div key={_id} className="p-2 md:w-1/5 ">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:shadow-2xl ">
                  <Link to={`/event/${_id}`}>
                    {imgAvatar ? (
                      <img
                        className="lg:h-28 md:h-16 w-full object-cover object-center justify-self-center"
                        src={`data:image/jpg;base64,${_arrayBufferToBase64(
                          imgAvatar?.img_200_200?.data?.data
                        )}`}
                        alt={name}
                      />
                    ) : (
                      <img
                        className="lg:h-28 md:h-16 w-full object-cover object-center justify-self-center"
                        src={Ava}
                        alt={name || " PhotoEvents"}
                      />
                    )}
                  </Link>
                 {/* <EventInfoBlock
                      type={type}
                      name={name}
                      _id={_id}
                      u_id={u_id}
                      users={users}
                    />*/}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  </div>
);
export { UserEventsSection };
