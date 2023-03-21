import { CoverAuth } from "./CoverAuth";

const AuthContainer = ({ children }) => (
  <div className="relative min-h-screen flex">
    <div className="flex  flex-row  md:items-start justify-center md:justify-start flex-auto min-w-0 bg-white">
      <CoverAuth />
      <div className="md:flex md:items-center md:justify-center w-auto md:h-full xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
        <div className="max-w-md w-full space-y-8">
          {children}
        </div>
      </div>
    </div>
  </div>
);
export { AuthContainer };
