import { useRouteError } from "react-router-dom";

const Errorpage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-48">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="text-indigo-500 font-bold text-7xl">
            {error?.message || 404}
          </div>

          <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
            {error?.response.statusText || "Страница не существует"}
          </div>

          <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
            Страница которую вы ищите не может быть найдена.
          </div>
        </div>
      </div>
    </div>
  );
};
export { Errorpage };
