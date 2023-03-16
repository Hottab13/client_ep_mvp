import { NavLink,Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

import { logoutUser } from "../../redux/slices/authSlice";

const Header = () => {
  const {isAuth} = useSelector((state) => state.authUser || {});
  const user = useSelector((state) => state.userProfileData || {});
  const dispatch = useDispatch();
  //всплывающее меню
  //const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    //setVisible(true);
  };
  const onClose = () => {
   // setVisible(false);
  };
  const logOutColbeck = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="px-2 mr-3 border-b flex items-center justify-between h-14">
      <Link className="uppercase font-bold text-indigo-500" to="/">
        EVENT PARTY
      </Link>

   <nav className="hidden md:flex items-center">
        {isAuth ? (
          <div>
            <ul className="inline-flex items-center">
              <li>
                <NavLink className="header-link" to="profile">
                  Профиль
                </NavLink>
              </li>
              <li>
                <NavLink className="header-link" to="events">
                  События
                </NavLink>
              </li>
              <li>
                <NavLink className="header-link" to="create-event">
                  Создать событие
                </NavLink>
              </li>
            </ul>
            <ul className="inline-flex items-center">
              <span>{user.userData.userName}</span>
              {/*<img src={`data:image/jpg;base64,${userProfileData.userData?.imgAvatar?.img_200_200}`} alt="UseName" />*/}

              <Link to={"login"}>
                <li>
                  <button className="header-btn" onClick={logOutColbeck}>
                    Выйти
                  </button>
                </li>
              </Link>
            </ul>
          </div>
        ) : (
          <ul className="inline-flex items-center">
            <Link to={"login"}>
              <li>
                <button className="header-btn">Войти</button>
              </li>
            </Link>
          </ul>
        )}
      </nav>

      <button className="inline-block md:hidden" onClick={showDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </header>
  );
};

export default Header;
