import { NavLink } from "react-router-dom";

const FriendsCard:React.FC = () => {
  return (
    <div className="bg-white p-3 mb-4 rounded-lg shadow-lg hover:shadow-xl">
      <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
        <span className="text-indigo-500">
          <svg
            className="h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
        <span>Подписки</span>
      </div>
      <div className="grid grid-cols-4">
       
        <div className="text-center my-2 rounded-lg hover:shadow-xl">
          <img
            className="h-16 w-16 rounded-full mx-auto  "
            src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
            alt=""
          />
          <NavLink to="#" className="text-main-color">
            Подписчик
          </NavLink>
        </div>
        <div className="text-center my-2 rounded-lg hover:shadow-xl">
          <img
            className="h-16 w-16 rounded-full mx-auto  "
            src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
            alt=""
          />
          <NavLink to="#" className="text-main-color">
            Подписчик
          </NavLink>
        </div>
        <div className="text-center my-2 rounded-lg hover:shadow-xl">
          <img
            className="h-16 w-16 rounded-full mx-auto  "
            src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
            alt=""
          />
          <NavLink to="#" className="text-main-color">
            Подписчик
          </NavLink>
        </div>
        <div className="text-center my-2 rounded-lg hover:shadow-xl">
          <img
            className="h-16 w-16 rounded-full mx-auto  "
            src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
            alt=""
          />
          <NavLink to="#" className="text-main-color">
            Подписчик
          </NavLink>
        </div>
        <div className="text-center my-2 rounded-lg hover:shadow-xl">
          <img
            className="h-16 w-16 rounded-full mx-auto  "
            src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
            alt=""
          />
          <NavLink to="#" className="text-main-color">
            Подписчик
          </NavLink>
        </div>
        <div className="text-center my-2 rounded-lg hover:shadow-xl">
          <img
            className="h-16 w-16 rounded-full mx-auto  "
            src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
            alt=""
          />
          <NavLink to="#" className="text-main-color">
            Подписчик
          </NavLink>
        </div>
        

      </div>
    </div>
  );
};
export {FriendsCard};
