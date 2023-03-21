import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../redux/slices/authSlice";
import {
  IconDividerMenu,
  IconHeaderClose,
  IconMobileMenu,
} from "../../assets/icon/Icon";

const MenuItem = ({ children, link }) => (
  <li>
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "text-sm text-indigo-500 font-bold"
          : "text-sm text-gray-400 hover:text-gray-500"
      }
      to={link}
    >
      {children}
    </NavLink>
  </li>
);
const MobileMenuItem = ({ children, link }) => (
  <li className="mb-1">
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "block p-4 text-sm font-semibold bg-blue-50 text-blue-600 rounded"
          : "block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
      }
      to={link}
    >
      {children}
    </NavLink>
  </li>
);
const Logo = () => (
  <Link
    className=" text-3xl leading-none uppercase font-bold text-indigo-500"
    to="/"
  >
    EVENT PARTY
  </Link>
);

const Header = () => {
  const { isAuth } = useSelector((state) => state.authUser || {});
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  return (
    <header className="bg-blue-500">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <Logo />
        <div className="lg:hidden">
          <button
            onClick={() => setVisible(!visible)}
            className="navbar-burger flex items-center text-indigo-600 p-3"
          >
            <IconMobileMenu />
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          <MenuItem link={"profile"}>Профиль</MenuItem>
          <IconDividerMenu />
          <MenuItem link={"events"}>События</MenuItem>
          <IconDividerMenu />
          <MenuItem link={"create-event"}>Создать событие</MenuItem>
        </ul>
        {isAuth ? (
          <button
            onClick={() => dispatch(logoutUser())}
            className=" hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
          >
            Выйти
          </button>
        ) : (
          <>
            <Link
              className=" hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
              to="login"
            >
              Войти
            </Link>
            <Link
              className="hidden lg:inline-block py-2 px-6 bg-indigo-500 hover:bg-indigo-600 text-sm text-white font-bold rounded-xl transition duration-200"
              to="registration"
            >
              Зарегистрироваться
            </Link>
          </>
        )}
      </nav>

      {visible && (
        <div className=" relative z-50">
          <div className=" fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <Logo />
              <button onClick={() => setVisible(!visible)}>
                <IconHeaderClose />
              </button>
            </div>
            <div>
              <ul>
                <MobileMenuItem link={"profile"}>Профиль</MobileMenuItem>
                <MobileMenuItem link={"events"}>События</MobileMenuItem>
                <MobileMenuItem link={"create-event"}>
                  Создать событие
                </MobileMenuItem>
              </ul>
            </div>

            <div className="mt-auto">
              <div className="pt-6">
                {isAuth ? (
                  <button
                    className="block mx-auto px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl"
                    onClick={() => dispatch(logoutUser())}
                  >
                    Выйти
                  </button>
                ) : (
                  <>
                    <Link
                      className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl"
                      to="login"
                    >
                      Войти
                    </Link>
                    <Link
                      className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-indigo-600 hover:bg-indigo-700  rounded-xl"
                      to="registration"
                    >
                      Зарегистрироваться
                    </Link>
                  </>
                )}
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <Link to="https://t.me/smartech_ceo">
                  Developer Alekseev Aleksey © 2023
                </Link>
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
