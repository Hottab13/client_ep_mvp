import { combineReducers } from "@reduxjs/toolkit";

import authUser from "./authSlice";
import userProfileData from "./userSlice";
import events from "./eventsSlice";

const rootReducer = combineReducers({
  authUser,
  userProfileData,
  events,
});

export default rootReducer;
