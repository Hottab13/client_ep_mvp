import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getEvents } from "../redux/slices/eventsSlice";
import { SearchEvents } from "../components/Events/SearchEvents/SearchEvents";
import { Loader } from "../components/Loader";
import { errorMessage } from "../components/Error";
import { EventsSection } from "../components/EventsSection";
import { PaginationEvents } from "../components/Events/PaginationEvents/PaginationEvents";
import { useAppDispatch, useAppSelector } from "../hook";

export type searchParamsProps = {
  page?: string;
  limit?: string;
  type?: string;
  search?: string;
  city?: string;
};

const Eventspage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, error, eventsData } = useAppSelector((state) => state.events);
  const { userData } = useAppSelector((state) => state.authUser);

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const eventLimit = searchParams.get("limit") || "";
  const eventType = searchParams.get("type") || "";
  const evenTown = searchParams.get("city") || "";
  const eventSearch = searchParams.get("search") || "";

  const pagination = (pageNumber: string) => {
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
    setPage(pageNumber);
  };
  const searchDataParams: searchParamsProps = {
    page: "",
    limit: "",
    type: "",
    search: "",
    city: "",
  };
  const handleSearch = (e: searchParamsProps) => {
    setPage("1");
    searchDataParams.page = "1";
    if (e.limit && e.limit.length > 1) searchDataParams.limit = e.limit;
    if (e.type && e.type.length > 1) searchDataParams.type = e.type;
    if (e.search && e.search.length > 1) searchDataParams.search = e.search;
    if (e.city && e.city.length > 1) searchDataParams.city = e.city;
    setSearchParams(searchDataParams);
  };
  useEffect(() => {
    searchDataParams.page = page;
    if (eventLimit.length > 1) searchDataParams.limit = eventLimit;
    if (eventType.length > 1) searchDataParams.type = eventType;
    if (eventSearch.length > 1) searchDataParams.search = eventSearch;
    if (evenTown.length > 1) searchDataParams.city = evenTown;
    dispatch(getEvents(searchDataParams));
  }, [dispatch, eventLimit, eventType, eventSearch, evenTown, page]);

  if (status === "loading") return <Loader />;
  if (error) return errorMessage(error);
  return (
    <div className="bg-gray-100">
      <SearchEvents
        handleSearch={handleSearch}
        eventLimit={eventLimit}
        eventType={eventType}
        evenTown={evenTown}
        eventSearch={eventSearch}
      />
      {eventsData && (
        <section className="text-gray-900 body-font pt-2">
          <EventsSection
            eventsData={eventsData.events.docs}
            ImgEvents={eventsData.ImgEvents}
            markupGrid={"md:w-1/5"}
            userData={userData}
          />
          <PaginationEvents
            eventsData={eventsData}
            pagination={pagination}
            page={page}
          />
        </section>
      )}
    </div>
  );
};
export { Eventspage };
