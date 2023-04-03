import { Link } from "react-router-dom";

const Footer:React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100">
      <div className="flex items-center justify-center max-w-screen-xl px-4 py-4 mx-auto ">
        <p className=" text-xs text-gray-800   ">
          <Link to="https://t.me/smartech_ceo">
            Developer Alekseev Aleksey © 2023
          </Link>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
