import { ChildComponent } from "../ChildComponent";

import { CoverAuth } from "./CoverAuth";

const AuthContainer = ({ children }) => (
  <ChildComponent className="relative min-h-screen flex">
    <ChildComponent className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
      <CoverAuth />
      <ChildComponent className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
        <ChildComponent className="max-w-md w-full space-y-8">
          {children}
        </ChildComponent>
      </ChildComponent>
    </ChildComponent>
  </ChildComponent>
);
export { AuthContainer };
