import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  IconArrowDown,
  IconSearch,
} from "../../../assets/icon/SearchEventsIcon";

const ArrowDown = () => (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <IconArrowDown />
  </div>
);

const SearchEvents = ({
  handleSearch,
  eventLimit,
  eventType,
  evenTown,
  eventSearch,
}) => {
  const [limit, setLimit] = useState(eventLimit);
  const [type, setType] = useState(eventType);
  const [search, setSearch] = useState(eventSearch);
  const [city, setCity] = useState(evenTown);

  const { register, handleSubmit } = useForm({
    mode: "onBlur",
  });
  return (
    <div className="container mx-auto px-3 py-3 ">
      <form
        onSubmit={handleSubmit(handleSearch)}
        autoComplete="off"
        className="my-3 flex sm:flex-row flex-col"
      >
        <div className="flex flex-row mb-1 sm:mb-0">
          <div className="relative">
            <select
              {...register("limit", {
                onChange: (e) => setLimit(e.target.value),
              })}
              value={limit}
              className="appearance-none h-full rounded-l border block  w-full bg-white border-gray-400 text-gray-700 py-2 px-4 mr-2  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
            <ArrowDown />
          </div>

          <div className="relative">
            <select
              {...register("type", {
                onChange: (e) => setType(e.target.value),
              })}
              value={type}
              className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
            >
              <option value="">Категория</option>
              <option value="Активный отдых">Активный отдых</option>
              <option value="Другое">Другое</option>
              <option value="Релакс">Релакс</option>
            </select>
            <ArrowDown />
          </div>

          <div className="relative">
            <select
              {...register("city", {
                onChange: (e) => setCity(e.target.value),
              })}
              value={city}
              className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none border-l  focus:bg-white focus:border-gray-500"
            >
              <option value="">Город</option>
              <option value="Саранск">Саранск</option>
              <option value="Москва">Москва</option>
              <option value="Санкт-Петербург">Санкт-Петербург</option>
              <option value="Другое">Другое</option>
            </select>
            <ArrowDown />
          </div>
        </div>

        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <IconSearch />
          </span>
          <input
            {...register("search", {
              onChange: (e) => setSearch(e.target.value),
            })}
            value={search}
            placeholder="Поиск..."
            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
        <div className="block relative">
          <input type="submit" value="" />
        </div>
      </form>
    </div>
  );
};
export { SearchEvents };
