import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../hook";
import { getEventProfile } from "../redux/slices/eventsSlice";

const useEventData= (id: string | undefined) => {
  const dispatch = useAppDispatch();
  const eventProfileData = useAppSelector(
    (state) => state.events.eventProfileData);
  useEffect(() => {
    dispatch(getEventProfile(id));
  }, [dispatch, id]);

  return eventProfileData;
};
export { useEventData };
