import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import { postSearchEvents } from "../redux/slices/eventsSlice";
import { SearchEvents } from "../components/Events/SearchEvents/SearchEvents";
import { Loader } from "../components/Loader";
import { errorMessage } from "../components/Error";
import { EventsSection } from "../components/EventsSection";
import { PaginationEvents } from "../components/Events/PaginationEvents/PaginationEvents";

const Eventspage = () => {
  const dispatch = useDispatch();
  const { status, error, eventsData } = useSelector(
    (state) => state.events || {}
  );
  const { userData } = useSelector((state) => state.userProfileData || {});
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const eventLimit = searchParams.get("limit") || "";
  const eventType = searchParams.get("type") || "";
  const evenTown = searchParams.get("city") || "";
  const eventSearch = searchParams.get("search") || "";
  const pagination = (pageNumber) => {
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
    setPage(pageNumber);
  };
  const handleSearch = (e) => {
    const params = {};
    setPage(1);
    params.page = 1;
    if (e.limit.length) params.limit = e.limit;
    if (e.type.length) params.type = e.type;
    if (e.search.length) params.search = e.search;
    if (e.city.length) params.city = e.city;
    setSearchParams(params);
  };
  useEffect(() => {
    const searchParams = {};
    searchParams.page = page;
    if (eventLimit.length > 1) searchParams.limit = eventLimit;
    if (eventType.length > 1) searchParams.type = eventType;
    if (eventSearch.length > 1) searchParams.search = eventSearch;
    if (evenTown.length > 1) searchParams.city = evenTown;
    dispatch(postSearchEvents(searchParams));
  }, [dispatch, eventLimit, eventType, eventSearch, evenTown, page]);
  if (status === "loading") return <Loader />;
  if (error) return errorMessage(error);
  return (
    <div className="bg-gray-100">
      <SearchEvents
        handleSearch={handleSearch}
        setSearchParams={setSearchParams}
        eventLimit={eventLimit}
        eventType={eventType}
        evenTown={evenTown}
        eventSearch={eventSearch}
      />
      {eventsData.events && (
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
