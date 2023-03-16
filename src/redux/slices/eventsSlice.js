import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import instance from "../../api/index";

export const getEvents = createAsyncThunk(
  "eventsSlice/getEvents",
  async function (_, { rejectWithValue }) {
    try {
      const response = await instance.get("events");
      if (!response.status === 200) {
        throw new Error("Не удалось получить события!");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const postSearchEvents = createAsyncThunk(
  "eventsSlice/postSearchEvents",
  async function (params, { rejectWithValue }) {
    try {
      const response = await instance.post("filtr-events/", {
        type: params.type,
        search: params.search,
      });
      if (!response.status === 200) {
        throw new Error("Не удалось получить отфильтрованные события!");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getEventProfile = createAsyncThunk(
  "eventsSlice/getEventProfile",
  async function (id, { rejectWithValue }) {
    try {
      const response = await instance.get(`event/${id}`);
      if (!response.status === 200) {
        throw new Error("Не удалось получить профиль события!");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addUserIdEvent = createAsyncThunk(
  "eventsSlice/addUserIdEvent",
  async function (userId, { rejectWithValue, getState, dispatch }) {
    const eventId = getState().events.eventProfileData.eventProfile._id;
    const { imgUser } = getState().userProfileData;
    try {
      const response = await instance.patch(`add-user-event/${eventId}`, {
        userId,
      });
      if (!response.status === 200) {
        throw new Error("Не удалось добавить пользователя!");
      }
      debugger;
      const payload = {
        userId,
        imgUser,
      };
      debugger;
      dispatch(addUserId(payload));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const delUserIdEvent = createAsyncThunk(
  "eventsSlice/delUserIdEvent",
  async function (userId, { rejectWithValue, getState, dispatch }) {
    const eventId = getState().events.eventProfileData.eventProfile._id;
    try {
      const response = await instance.patch(`del-user-event/${eventId}`, {
        userId,
      });

      if (!response.status === 200) {
        throw new Error("Не удалось удалить пользователя!");
      }
      dispatch(delUserId(userId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createEvent = createAsyncThunk(
  "eventsSlice/createEvent",
  async function (data, { rejectWithValue, getState, dispatch }) {
    const id = getState().userProfileData.userData._id;
    try {
      const response = await instance.post(`create-event/${id}`, data.resData);
      if (!response.status === 200) {
        throw new Error("Не удалось создать событие!");
      }
      if (data.formData) {
        dispatch(
          uploadPhotoEvent({ id: response.data._id, formData: data.formData })
        );
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const uploadPhotoEvent = createAsyncThunk(
  "eventsSlice/uploadPhotoEvent",
  async function (data, { rejectWithValue, getState }) {
    if (!data.id) {
      data.id = getState().events.eventProfileData.eventProfile._id;
    }
    try {
      const responseImg = await instance.post(
        `create-event-img/${data.id}`,
        data.formData
      );
      if (!responseImg.status === 200) {
        throw new Error("Не удалось обновить фото!");
      }
      return responseImg.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteEvent = createAsyncThunk(
  "eventsSlice/deleteEvent",
  async function (_, { rejectWithValue, getState, dispatch }) {
    const eventId = getState().events.eventProfileData.eventProfile._id;
    try {
      const response = await instance.delete(`event/${eventId}`);
      if (!response.status === 200) {
        throw new Error("Не удалось удалить событие!");
      }
      dispatch(delEvent(eventId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editEventData = createAsyncThunk(
  "eventsSlice/editEventData",
  async function (data, { rejectWithValue, getState }) {
    const id = getState().events.eventProfileData.eventProfile._id;
    try {
      debugger;
      const resEditEventData = await instance.patch(
        `edit-event-data/${id}`,
        data
      );
      debugger;
      if (!resEditEventData.status === 200) {
        throw new Error("Не удалось обновить данные!");
      }
      return resEditEventData.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};
const setPending = (state) => {
  state.status = "loading";
  state.error = null;
};

const events = createSlice({
  name: "eventsSlice",
  initialState: {
    eventsData: [],
    status: null,
    error: null,
    message: "",
    hendelDelEvent: false,
    eventProfileData: {
      eventProfile: "",
      partyUsers: "",
      partyUsersImg: "",
      eventImg: "",
      ownerUserData: "",
    },
  },
  reducers: {
    addUserId(state, action) {
      state.eventProfileData.eventProfile.users.push(action.payload.userId);
      state.eventProfileData.eventProfile.amountMaximum =
        state.eventProfileData.eventProfile.amountMaximum - 1;
      state.eventProfileData.partyUsersImg.push(action.payload.imgUser);
    },
    delUserId(state, action) {
      debugger;
      state.eventProfileData.eventProfile.users =
        state.eventProfileData.eventProfile.users.filter(
          (id) => id !== action.payload
        );
      state.eventProfileData.eventProfile.amountMaximum =
        state.eventProfileData.eventProfile.amountMaximum + 1;
      state.eventProfileData.partyUsersImg =
        state.eventProfileData.partyUsersImg.filter(
          (id) => id.user !== action.payload
        );
    },
    delEvent(state, action) {
      state.eventsData.events = state.eventsData.events.filter(
        (id) => id._id !== action.payload
      );
    },
  },
  extraReducers: {
    [getEvents.pending]: setPending,
    [getEvents.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.eventsData = action.payload;
      state.hendelDelEvent = false;
    },
    [getEvents.rejected]: setError,

    [postSearchEvents.pending]: setPending,
    [postSearchEvents.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.eventsData.events = action.payload;
    },
    [postSearchEvents.rejected]: setError,

    [getEventProfile.pending]: setPending,
    [getEventProfile.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.eventProfileData = {
        eventProfile: action.payload.eventProfile,
        partyUsers: action.payload.partyUsers,
        partyUsersImg: action.payload.partyUsersImg,
        eventImg: action.payload.eventImg,
        ownerUserData: action.payload.ownerUserData,
      };
    },
    [getEventProfile.rejected]: setError,

    [delUserIdEvent.pending]: setPending,
    [delUserIdEvent.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [addUserIdEvent.pending]: setPending,
    [addUserIdEvent.fulfilled]: (state) => {
      state.status = "resolved";
    },

    [deleteEvent.pending]: setPending,
    [deleteEvent.fulfilled]: (state) => {
      state.status = "resolved";
      state.eventProfileData = "";
      state.hendelDelEvent = true;
    },
    [deleteEvent.rejected]: setError,

    [uploadPhotoEvent.pending]: setPending,
    [uploadPhotoEvent.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.status = "resolved";
      state.eventProfileData = {
        ...state.eventProfileData,
        eventImg: action.payload,
      };
    },
    [uploadPhotoEvent.rejected]: setError,

    [editEventData.pending]: setPending,
    [editEventData.fulfilled]: (state, action) => {
      debugger
      state.status = "resolved";
      state.eventProfileData = {
        ...state.eventProfileData,
        eventProfile: action.payload,
      };
    },
    [editEventData.rejected]: setError,
  },
});

export default events.reducer;
const { addUserId, delUserId, delEvent } = events.actions;
