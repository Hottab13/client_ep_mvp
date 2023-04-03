/*export const AlertInfo = ({ message }) => (
  <div
    className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
    role="alert"
  >
    <svg
      className="w-5 h-5 inline mr-3"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      ></path>
    </svg>
    <div>
      <span className="font-medium">Info!</span> {message}
    </div>
  </div>
);
export const AlertDanger = ({ message }) => (
  <div
    className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
    role="alert"
  >
    <svg
      className="w-5 h-5 inline mr-3"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      ></path>
    </svg>
    <div>
      <span className="font-medium">Danger!</span> {message}
    </div>
  </div>
);*/
interface AlertSuccessType {
  message: null | string | undefined;
}
interface SetErrorType {
  message: null | string|undefined;
  errors:
    | null
    | {
        value: string;
        msg: string;
        param: string;
        location: string;
      }[];
}

export const AlertSuccess: React.FC<AlertSuccessType> = ({ message }) => (
  <div
    className="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"
    role="alert"
  >
    <svg
      className="w-5 h-5 inline mr-3"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      ></path>
    </svg>
    <div>
      {message && <span className="font-medium">Success!{message}</span>}
    </div>
  </div>
);

export const AlertWarning: React.FC<SetErrorType> = ({ message, errors }) => (
  <div
    className="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700"
    role="alert"
  >
    <svg
      className="w-5 h-5 inline mr-3"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      ></path>
    </svg>
    <div>
      <span className="font-medium">{message || ""}</span>
      {errors && errors.length > 0 && errors.map((el) => el.msg + "/")}
    </div>
  </div>
);
