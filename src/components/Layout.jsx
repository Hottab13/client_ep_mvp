import { Outlet } from "react-router-dom";

import Header from "./Haeder/Header.jsx";
import Footer from "./Footer/Footer.jsx";

const Layout = () => {
  return (
    <div className="bg-gray-100 max-w-screen-xl mx-auto h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export { Layout };
