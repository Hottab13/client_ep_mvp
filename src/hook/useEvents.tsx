import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../hook";

import { getEvents } from "../redux/slices/eventsSlice";

const useEvents = () => {
  const dispatch = useAppDispatch();
  const eventsData = useAppSelector((state) => state.events.eventsData || {});
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);
  return eventsData;
};
export { useEvents };
