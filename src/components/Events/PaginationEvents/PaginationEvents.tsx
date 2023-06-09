import { EventsResponse } from "../../../types/EventTypes";

type PaginationEventsProps={
  eventsData:EventsResponse;
  page:string;
  pagination:(pageNumber: string) => void
}
const PaginationEvents:React.FC<PaginationEventsProps> = ({ eventsData, page, pagination }) => {
  const pageNum = Number(page);
  const iIndexEnd = eventsData.events.pages;
  const pageNumbers = [];
  let iIndexStart = 1;
  let iIndexDo = iIndexEnd;
  if (pageNum >= iIndexEnd) {
    iIndexDo = iIndexEnd;
  } else if (pageNum + 3 < iIndexEnd) {
    iIndexDo = pageNum + 3;
  }
  if (pageNum > 3) {
    iIndexStart = pageNum - 3;
  }
  for (let i = iIndexStart; i <= iIndexDo; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className=" flex justify-center">
      <ul className="flex flex-warp  -space-x-px my-4 rounded-lg">
        {pageNum > 1 && (
          <li>
            <button
              onClick={() => pagination(String(pageNum - 1))}
              className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Назад
            </button>
          </li>
        )}

        {pageNumbers.map((el) => (
          <li key={el}>
            <button
              onClick={() => pagination(String(el))}
              className={
                pageNum === el
                  ? "bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0  leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
            >
              {el}
            </button>
          </li>
        ))}
        {pageNum < iIndexEnd && (
          <li>
            <button
              onClick={() => pagination(String(pageNum + 1))}
              className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Вперед
            </button>
          </li>
        )}

        <span className="pl-4">Страниц: {iIndexEnd}</span>
      </ul>
    </nav>
  );
};
export { PaginationEvents };
