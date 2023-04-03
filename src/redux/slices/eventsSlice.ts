import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import instance from "../../api/index";
import { searchParamsProps } from "../../pages/Eventspage";
import {
  EventProfileData,
  EventsResponse,
  InitialStateType,
  ImageUserType,
  EventProfile,
  ImageEventType,
} from "../../types/EventTypes";
import { AuthState } from "../../types/UserTypes";

const initialState: InitialStateType = {
  eventsData: null,
  status: null,
  error: null,
  message: null,
  hendelDelEvent: false,
  eventProfileData: {
    eventProfile: null,
    partyUsers: null,
    partyUsersImg: null,
    eventImg: null,
    ownerUserData: null,
  },
};
export const getEvents = createAsyncThunk<
  EventsResponse,
  searchParamsProps | undefined,
  { rejectValue: string }
>("eventsSlice/getEvents", async (params, { rejectWithValue }) => {
  try {
    const response = await instance.post("filtr-events/", params);
    return response.data;
  } catch {
    return rejectWithValue("Не удалось получить события!");
  }
});
export const getEventProfile = createAsyncThunk<
  EventProfileData,
  string | undefined,
  { rejectValue: string }
>("eventsSlice/getEventProfile", async (id, { rejectWithValue }) => {
  try {
    const response = await instance.get(`event/${id}`);
    return response.data;
  } catch {
    return rejectWithValue("Не удалось получить профиль события!");
  }
});
type addUserIdEventRes = {
  userId: string | undefined;
  imgUser: ImageUserType | null;
};
export const addUserIdEvent = createAsyncThunk<
  addUserIdEventRes,
  string | undefined,
  {
    rejectValue: string;
    state: { events: InitialStateType; authUser: AuthState };
  }
>(
  "eventsSlice/addUserIdEvent",
  async (userId, { rejectWithValue, getState }) => {
    const eventId = getState().events.eventProfileData?.eventProfile;
    const imgUser = getState().authUser.imgUser;
    try {
      await instance.patch(`add-user-event/${eventId?._id}`, {
        userId,
      });
      return { userId, imgUser };
    } catch {
      return rejectWithValue("Не удалось добавить пользователя!");
    }
  }
);
export const delUserIdEvent = createAsyncThunk<
  string | undefined,
  string | undefined,
  {
    rejectValue: string;
    state: { events: InitialStateType };
  }
>(
  "eventsSlice/delUserIdEvent",
  async (userId, { rejectWithValue, getState }) => {
    const eventId = getState().events.eventProfileData?.eventProfile;
    try {
      await instance.patch(`del-user-event/${eventId?._id}`, {
        userId,
      });
      return userId;
    } catch (error) {
      return rejectWithValue("Не удалось удалить пользователя!");
    }
  }
);
export const createEvent = createAsyncThunk<
  EventProfile,
  EventProfile,
  {
    rejectValue: string;
    state: { authUser: AuthState };
  }
>("eventsSlice/createEvent", async (data, { rejectWithValue, getState }) => {
  const userId = getState().authUser.userData?._id;
  try {
    const response = await instance.post(`create-event/${userId}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue("Не удалось создать событие!");
  }
});

type uploadPhotoEventProps = {
  id?: string;
  formData: any;
};
export const uploadPhotoEvent = createAsyncThunk<
  ImageEventType,
  uploadPhotoEventProps,
  {
    rejectValue: string;
    state: { events: InitialStateType };
  }
>(
  "eventsSlice/uploadPhotoEvent",
  async (data, { rejectWithValue, getState }) => {
    if (!data.id) {
      data.id = getState().events.eventProfileData?.eventProfile?._id;
    }
    try {
      const responseImg = await instance.post(
        `create-event-img/${data.id}`,
        data.formData
      );
      return responseImg.data;
    } catch (error) {
      return rejectWithValue("Не удалось загрузить фото!");
    }
  }
);
export const deleteEvent = createAsyncThunk<
  string | undefined,
  undefined,
  {
    rejectValue: string;
    state: { events: InitialStateType };
  }
>("eventsSlice/deleteEvent", async (_, { rejectWithValue, getState }) => {
  const eventId = getState().events.eventProfileData?.eventProfile?._id;
  try {
    await instance.delete(`event/${eventId}`);
    return eventId;
  } catch (error) {
    return rejectWithValue("Не удалось удалить событие!");
  }
});
export const editEventData = createAsyncThunk<
  EventProfile,
  EventProfile,
  {
    rejectValue: string;
    state: { events: InitialStateType };
  }
>("eventsSlice/editEventData", async (data, { rejectWithValue, getState }) => {
  const eventId = getState().events.eventProfileData?.eventProfile?._id;
  try {
    debugger;
    const resEditEventData = await instance.patch(
      `edit-event-data/${eventId}`,
      data
    );
    debugger;
    return resEditEventData.data;
  } catch (error) {
    return rejectWithValue("Не удалось обновить данные!");
  }
});
const events = createSlice({
  name: "eventsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = "resolved";
        state.eventsData = action.payload;
        state.hendelDelEvent = false;
      })
      .addCase(getEventProfile.fulfilled, (state, action) => {
        state.status = "resolved";
        state.hendelDelEvent = false;
        state.eventProfileData = {
          eventProfile: action.payload.eventProfile,
          partyUsers: action.payload.partyUsers,
          partyUsersImg: action.payload.partyUsersImg,
          eventImg: action.payload.eventImg,
          ownerUserData: action.payload.ownerUserData,
        };
      })
      .addCase(addUserIdEvent.fulfilled, (state, action) => {
        state.status = "resolved";
        state.hendelDelEvent = false;
        if (action.payload.userId) {
          state.eventProfileData.eventProfile?.users?.push(
            action.payload.userId
          );
        }
        if (state.eventProfileData.eventProfile?.amountMaximum) {
          state.eventProfileData.eventProfile.amountMaximum =
            state.eventProfileData.eventProfile.amountMaximum - 1;
        }
        if (action.payload.imgUser) {
          state.eventProfileData.partyUsersImg?.push(action.payload.imgUser);
        }
      })
      .addCase(delUserIdEvent.fulfilled, (state, action) => {
        state.status = "resolved";
        state.hendelDelEvent = false;
        if (state.eventProfileData.eventProfile) {
          state.eventProfileData.eventProfile.users =
            state.eventProfileData.eventProfile.users?.filter(
              (id) => id !== action.payload
            );
        }
        if (state.eventProfileData.eventProfile) {
          state.eventProfileData.eventProfile.amountMaximum =
            state.eventProfileData.eventProfile.amountMaximum + 1;
        }
        if (state.eventProfileData.partyUsersImg) {
          state.eventProfileData.partyUsersImg =
            state.eventProfileData.partyUsersImg.filter(
              (id) => id.user !== action.payload
            );
        }
      })
      .addCase(uploadPhotoEvent.fulfilled, (state, action) => {
        state.status = "resolved";
        state.hendelDelEvent = false;
        state.eventProfileData = {
          ...state.eventProfileData,
          eventImg: action.payload,
        };
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = "resolved";
        state.hendelDelEvent = false;
        if (state.eventProfileData)
          state.eventProfileData.eventProfile = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = "resolved";
        state.hendelDelEvent = true;
        state.eventProfileData = null;
        if (state.eventsData)
          state.eventsData.events.docs = state.eventsData.events.docs.filter(
            (id) => id._id !== action.payload
          );
      })
      .addCase(editEventData.fulfilled, (state, action) => {
        state.status = "resolved";
        state.hendelDelEvent = false;
        if (state.eventProfileData)
          state.eventProfileData = {
            ...state.eventProfileData,
            eventProfile: action.payload,
          };
      })

      .addMatcher(isRejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.message = null;
        state.status = "loading";
        state.error = null;
      });
  },
});

export default events.reducer;
