import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import instance, { API_URL } from "../../api/index";

import { setUserData } from "./userSlice";

export const loginUser = createAsyncThunk(
  "authUserSlice/loginUser",
  async function (params, { rejectWithValue, dispatch }) {
    try {
      const response = await instance.post("login/", {
        email: params.email,
        password: params.password,
      });
      if (!response.status === 200) {
        throw new Error("Не удалось авторизоватсья!");
      }
      if (response.data.user.isActivated) {
        if (params.remember_me) {
          localStorage.setItem("token", response.data.accessToken);
        }
        dispatch(setUserData(response.data));
      } else {
        throw new Error(`Необходимо активировать аккаунт ${params.email}`);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const registrationUser = createAsyncThunk(
  "authUserSlice/registrationUser",
  async function (params, { rejectWithValue, dispatch }) {
    try {
      const response = await instance.post("registration/", {
        email: params.email,
        password: params.password,
        userName: params.userName,
      });
      if (!response.status === 200) {
        throw new Error("Не удалось выполнить регистрацию!");
      }
      dispatch(isRegistration(response.data.message));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "authUserSlice/logoutUser",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await instance.post("logout/");
      if (!response.status === 200) {
        throw new Error("Не удалось выполнить выход!");
      }
      localStorage.removeItem("token");
      dispatch(isAuthFalse());
      dispatch(setUserData(null));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const checkUser = createAsyncThunk(
  "authUserSlice/checkUser",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await Axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
        
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        dispatch(setUserData(response.data));
      } else if (response.status === 401) {
        localStorage.removeItem("token"); 
        dispatch(setUserData());
      } else {
        throw new Error("Не удалось выполнить аунтификацию!");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  debugger;
  state.status = "rejected";
  state.isAuth = false;
  state.errorProcessing = {
    errorHeader: action.payload.message,
    errorMessagesArr: action.payload.errors?.map((el, index) => el.msg + "/ "),
  };
};
const authUser = createSlice({
  name: "authUserSlice",
  initialState: {
    status: null,
    isAuth: false,
    isRegistration: false,
    errorProcessing: {
      errorMessagesArr: "",
      errorHeader: " ",
    },
  },
  reducers: {
    isRegistration(state, action) {
      state.message = action.payload;
      state.isRegistration = !state.isRegistration;
    },
    isAuthFalse(state){
      state.isAuth = false;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
      state.errorProcessing = null;
    },
    [loginUser.fulfilled]: (state) => {
      state.isAuth = true;
      state.status = "resolved";
    },
    [loginUser.rejected]: setError,

    [registrationUser.pending]: (state) => {
      state.status = "loading";
      state.errorProcessing = null;
    },
    [registrationUser.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [registrationUser.rejected]: setError,

    [logoutUser.pending]: (state) => {
      state.status = "loading";
      state.errorProcessing = null;
    },
    [logoutUser.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [logoutUser.rejected]: setError,

    [checkUser.pending]: (state) => {
      state.status = "loading";
      state.errorProcessing = null;
    },
    [checkUser.fulfilled]: (state) => {
      state.status = "resolved";
      state.isAuth = true;
    },
    [checkUser.rejected]: setError,
  },
});

export default authUser.reducer;
const { isRegistration, isAuthFalse } = authUser.actions;
