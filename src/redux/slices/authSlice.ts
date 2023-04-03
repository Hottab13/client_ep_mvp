import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";
import Axios from "axios";

import instance, { API_URL } from "../../api/index";
import {
  AuthState,
  DataInfo,
  GetUserData,
  LoginUserProps,
  RegistrationUserProps,
  SetErrorType,
  UserData,
} from "../../types/UserTypes";

const initialState: AuthState = {
  status: null,
  isAuth: false,
  isRegistration: false,
  message: null,
  errorProcessing: {
    message: null,
    errors: null,
  },
  userData: {
    _id: "",
    email: "",
    isActivated: false,
    createdAt: null,
    data: {
      userName: "",
      userSurname: null,
      userGender: null,
      userPhone: null,
      usersDateBirth: null,
      status: null,
      aboutMe: null,
    },
  },
  imgUser: null,
  userEvents: [],
  userImgEvents: [],
  userDataId: null,
};
export const uploadPhotoProfileAva = createAsyncThunk<
  any | null,
  any,
  { rejectValue: SetErrorType; state: { authUser: AuthState } }
>(
  "userProfileDataSlice/uploadPhotoProfileAva",
  async function (formData, { rejectWithValue, getState }) {
    const userData = getState().authUser.userData;
    try {
      const response = await instance.put(
        `edit-user-ava/${userData && userData._id}`,
        formData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const uploadDataUserProfile = createAsyncThunk<
  UserData,
  DataInfo,
  { rejectValue: SetErrorType; state: { authUser: AuthState } }
>(
  "userProfileDataSlice/uploadDataUserProfile",
  async (data, { rejectWithValue, getState }) => {
    try {
      const userData = getState().authUser.userData;
      const response = await instance.patch(
        `edit-user-data/${userData && userData._id}`,
        {
          data,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserId = createAsyncThunk<
  GetUserData,
  string | undefined,
  { rejectValue: SetErrorType }
>("userProfileDataSlice/getUserId", async (id, { rejectWithValue }) => {
  try {
    const response = await instance.get(`user/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data) as unknown as SetErrorType;
  }
});
export const loginUser = createAsyncThunk<
  GetUserData,
  LoginUserProps,
  { rejectValue: SetErrorType }
>("authUserSlice/loginUser", async (params, { rejectWithValue }) => {
  const errorProcessing: SetErrorType = {
    message: null,
    errors: null,
  };
  try {
    const response = await instance.post("login/", {
      email: params.email,
      password: params.password,
    });
    if (response.data.userData.isActivated) {
      if (params.remember_me==="remember_me") {
        localStorage.setItem("token", response.data.accessToken);
      }
      return response.data;
    } else {
      errorProcessing.message = `Необходимо активировать аккаунт ${params.email}`;
      return rejectWithValue(errorProcessing);
    }
  } catch (error: any) {
    return rejectWithValue(error.response.data) as unknown as SetErrorType;
  }
});
export const registrationUser = createAsyncThunk<
  string,
  RegistrationUserProps,
  { rejectValue: SetErrorType }
>("authUserSlice/registrationUser", async (params, { rejectWithValue }) => {
  try {
    const response = await instance.post("registration/", {
      email: params.email,
      password: params.password,
      userName: params.userName,
    });
    return response.data.message;
  } catch (error: any) {
    return rejectWithValue(error.response.data) as unknown as SetErrorType;
  }
});
export const logoutUser = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>("authUserSlice/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await instance.post("logout/");
    localStorage.removeItem("token");
  } catch {
    return rejectWithValue("Не удалось выполнить разлогирование!");
  }
});
export const checkUser = createAsyncThunk<
  GetUserData,
  undefined,
  { rejectValue: string }
>("authUserSlice/checkUser", async (_, { rejectWithValue }) => {
  try {
    const response = await Axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  } catch (err: any) {
    localStorage.removeItem("token");
    return rejectWithValue(err.response.data.message);
  }
});
const authUser = createSlice({
  name: "authUserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhotoProfileAva.fulfilled, (state, action) => {
        state.status = "resolved";
        state.isAuth = true;
        state.imgUser = action.payload;
      })
      .addCase(uploadPhotoProfileAva.rejected, (state, action) => {
        state.status = "rejected";
        state.errorProcessing = action.payload;
      })
      .addCase(uploadDataUserProfile.fulfilled, (state, action) => {
        state.status = "resolved";
        state.isAuth = true;
        state.userData = action.payload;
      })
      .addCase(uploadDataUserProfile.rejected, (state, action) => {
        state.status = "rejected";
        state.errorProcessing = action.payload;
      })
      .addCase(getUserId.fulfilled, (state, action) => {
        state.status = "resolved";
        state.isAuth = true;
        state.userDataId = action.payload;
      })
      .addCase(getUserId.rejected, (state, action) => {
        state.status = "rejected";
        state.errorProcessing = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.isAuth = true;
        state.userData = action.payload.userData;
        state.imgUser = action.payload.imgUser;
        state.userEvents = action.payload.userEvents;
        state.userImgEvents = action.payload.userImgEvents;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "rejected";
        state.isAuth = false;
        state.errorProcessing = action.payload;
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.message = action.payload;
        state.isRegistration = !state.isRegistration;
      })
      .addCase(registrationUser.rejected, (state, action) => {
        state.status = "rejected";
        state.isAuth = false;
        state.errorProcessing = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "resolved";
        state.isAuth = false;
        state.userData = null;
        state.imgUser = null;
        state.userEvents = null;
        state.userImgEvents = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "rejected";
        state.isAuth = false;
        state.errorProcessing = {
          message: action.payload,
          errors: null,
        };
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.isAuth = true;
        state.userData = action.payload.userData;
        state.imgUser = action.payload.imgUser;
        state.userEvents = action.payload.userEvents;
        state.userImgEvents = action.payload.userImgEvents;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.status = "rejected";
        state.isAuth = false;
        state.userData = null;
        state.imgUser = null;
        state.userEvents = null;
        state.userImgEvents = null;
        state.errorProcessing = {
          message: action.payload,
          errors: null,
        };
      })
      .addMatcher(isPending, (state) => {
        state.message = null;
        state.status = "loading";
        state.errorProcessing = {
          message: null,
          errors: null,
        };
      });
  },
});
export default authUser.reducer;
