import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

import { postSearchEvents } from "../redux/slices/eventsSlice";
import { SearchEvents } from "../components/Events/SearchEvents/SearchEvents";
import { Loader } from "../components/Loader";
import { errorMessage } from "../components/Error";
import { useEvents } from "../hook/useEvents";
import { EventEl } from "../components/Events/EventEl";

const EventContainer = ({ children }) => (
  <section className="text-gray-600 body-font">
    <div className="container p-5 mx-auto">
      <div className="flex flex-wrap -m-4">{children}</div>
    </div>
  </section>
);
 
const Eventspage = () => {
  const dispatch = useDispatch();
  const events = useEvents();
  const { status, error } = useSelector(
    (state) => state.events || {}
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const eventQuery = searchParams.get("event") || " ";
  const eventSelect = searchParams.get("type") || " ";
  
  const hendlerSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const search = form.search.value;
    const type = form.type.value;
    const params = {};
    if (search.length) params.event = search;
    if (type.length) params.type = type;
    setSearchParams(params);
    dispatch(postSearchEvents(params));
  };
  if (status === "loading") return <Loader />;
  if (error) return errorMessage(error);
  return (
    <div className="bg-gray-100">
      <SearchEvents
        hendlerSubmit={hendlerSubmit}
        eventQuery={eventQuery}
        eventSelect={eventSelect}
      />
      <EventContainer>{events && <EventEl events={events} />}</EventContainer>
    </div>
  );
};
export { Eventspage };
