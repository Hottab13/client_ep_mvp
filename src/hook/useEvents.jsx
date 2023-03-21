import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getEvents } from "../redux/slices/eventsSlice";

const useEvents = () => {
  const dispatch = useDispatch();
  const eventsData = useSelector((state) => state.events.eventsData || {});
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);
  return eventsData;
};
export { useEvents };
