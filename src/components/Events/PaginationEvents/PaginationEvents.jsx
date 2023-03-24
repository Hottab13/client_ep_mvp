const PaginationEvents = ({ eventsData, page, pagination }) => {
  const iIndexEnd = eventsData.events.pages;
  const pageNumbers = [];
  let iIndexStart = 1;
  let iIndexDo = iIndexEnd;
  if (page >= iIndexEnd) {
    iIndexDo = iIndexEnd;
  } else if (page + 3 < iIndexEnd) {
    iIndexDo = page + 3;
  }
  if (page > 3) {
    iIndexStart = page - 3;
  }
  for (let i = iIndexStart; i <= iIndexDo; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className=" flex justify-center">
      <ul className="flex flex-warp  -space-x-px my-4 rounded-lg">
        {page > 1 && (
          <li>
            <button
              onClick={() => pagination(page - 1)}
              className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Назад
            </button>
          </li>
        )}

        {pageNumbers.map((el) => (
          <li key={el}>
            <button
              onClick={() => pagination(el)}
              className={
                page === el
                  ? "bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0  leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
            >
              {el}
            </button>
          </li>
        ))}
        {page < iIndexEnd && (
          <li>
            <button
              onClick={() => pagination(page + 1)}
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
