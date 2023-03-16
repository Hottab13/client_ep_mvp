import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getEventProfile } from "../redux/slices/eventsSlice";


const useEventData = (id) => {
  const dispatch = useDispatch();
  const { eventProfile } = useSelector(
    (state) => state.events.eventProfileData || {}
  );
  useEffect(() => {
    dispatch(getEventProfile(id));
  }, [dispatch, id]);

  return eventProfile;
};
export { useEventData };
