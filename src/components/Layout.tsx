import { Outlet } from "react-router-dom";

import Header from "./Haeder/Header";
import Footer from "./Footer/Footer";

const Layout: React.FC = () => {
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
