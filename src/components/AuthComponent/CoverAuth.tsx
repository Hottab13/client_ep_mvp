import coverAuth from "../../assets/images/aditya-chinchure-ZhQCZjr9fHo-unsplash.jpg";

const CoverAuth:React.FC = () => (
  <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
    <img
      className="absolute left-0 top-0 w-full h-full z-0 object-cover"
      src={coverAuth}
      alt={"EventParty"}
    />
    <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
    <div className="w-full  max-w-md z-10">
      <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
        Event Party
      </div>
      <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
        Платформа для поиска и создания событий. Создавай свои собственные
        события или происоеденяйся к другим, использую поиск, веди прямые
        трансляии вместе со своими друзьями!
      </div>
    </div>
    <ul className="circles"> 
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
);
export { CoverAuth };
