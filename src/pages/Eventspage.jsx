import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

import { postSearchEvents } from "../redux/slices/eventsSlice";
import { SearchEvents } from "../components/Events/SearchEvents/SearchEvents";
import { Loader } from "../components/Loader";
import { errorMessage } from "../components/Error";
import { useEvents } from "../hook/useEvents";
import { EventsSection } from "../components/EventsSection";


const Eventspage = () => {
  const dispatch = useDispatch();
  const eventsData = useEvents();
  const { status, error } = useSelector((state) => state.events || {});
  const { userData } = useSelector((state) => state.userProfileData || {});
  const [searchParams, setSearchParams] = useSearchParams();
  //const valueEventLimit = searchParams.get("limit") || "";
 // const eventSelect = searchParams.get("type") || " ";

  const handleSearch = (e) => {
    debugger
    const limit = e.limit;
    const type = e.type;
    const params = {};
    if (limit.length) params.limit = limit;
    if (type.length) params.type = type;
    setSearchParams(params);
    //dispatch(postSearchEvents(params));
  };
  /*const eventsData = useSelector((state) => state.events.eventsData || {});
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);*/
  if (status === "loading") return <Loader />;
  if (error) return errorMessage(error);
  return (
    <div className="bg-gray-100">
      <SearchEvents
        handleSearch={handleSearch}
        searchParams={searchParams}
      />
      {eventsData.events && (
        <EventsSection
          eventsData={eventsData.events.docs}
          ImgEvents={eventsData.ImgEvents}
          markupGrid={"md:w-1/5"}
          userData={userData}
        />
      )}
      {/*<EventContainer>{events && <EventEl events={events} />}</EventContainer> */}
    </div>
  );
};
export { Eventspage };
