import { combineReducers } from "@reduxjs/toolkit";

import authUser from "./authSlice";
import events from "./eventsSlice";

const rootReducer = combineReducers({
  authUser,
  events,
});

export default rootReducer;
