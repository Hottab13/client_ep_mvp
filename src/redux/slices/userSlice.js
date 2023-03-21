import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import instance from "../../api";

export const uploadPhotoProfileAva = createAsyncThunk(
  "userProfileDataSlice/uploadPhotoProfileAva",
  async function (payload, { rejectWithValue, getState }) {
    const id = getState().userProfileData.userData._id;
    try {
      const response = await instance.put(`edit-user-ava/${id}`, payload);
      if (!response.status === 200) {
        throw new Error("Не удалось загрузить фото! Ошибка сервера!");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserId = createAsyncThunk(
  "userProfileDataSlice/getUserId",
  async function (id, { rejectWithValue }) {
    try {
      const response = await instance.get(`user/${id}`);
      if (!response.status === 200) {
        throw new Error("Не удалось загрузить профиль! Ошибка сервера!");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const uploadDataUserProfile = createAsyncThunk(
  "userProfileDataSlice/uploadDataUserProfile",
  async function (data, { rejectWithValue, getState }) {
    try {
      const {_id} = getState().userProfileData.userData;
      const response = await instance.patch(`edit-user-data/${_id}`, {
        data,
      });
      if (!response.status === 200) {
        throw new Error("Не удалось обновить данные! Ошибка сервера!");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
const userProfileData = createSlice({
  name: "userProfileDataSlice",
  initialState: {
    status: null,
    userData: {
      _id: " ",
      email: " ",
      isActivated: false,
      createdAt: " ",
      data: {
        userName: " ",
        userSurname: " ",
        userGender: " ",
        userPhone: " ",
        usersDateBirth: " ",
        status: " ",
        aboutMe: " ",
      },
    },
    userDataId: "",
    imgUser: "",
    userEvents: "",
    userImgEvents:"",
  },
  reducers: {
    setUserData(state, action) {
      state.userData = {
        _id: action.payload?.user._id,
        email: action.payload?.user.email,
        isActivated: action.payload?.user.isActivated,
        createdAt: action.payload?.user.createdAt,
        data: {
          userName: action.payload?.user.data.userName,
          userSurname: action.payload?.user.data.userSurname,
          userGender: action.payload?.user.data.userGender,
          userPhone: action.payload?.user.data.userPhone,
          usersDateBirth: action.payload?.user.data.usersDateBirth,
          status: action.payload?.user.data.status,
          aboutMe: action.payload?.user.data.aboutMe,
        },
      };
      state.imgUser = action.payload?.imgUser;
      state.userEvents = action.payload?.userEvents; 
      state.userImgEvents = action.payload?.userImgEvents;
    },
  },
  extraReducers: {
    [uploadPhotoProfileAva.pending]: (state) => {
      state.status = "loading";
      //state.errorProcessing = null;
    },
    [uploadPhotoProfileAva.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.status = "resolved";
      state.imgUser = action.payload;
    },
    [uploadPhotoProfileAva.rejected]: setError,

    [getUserId.pending]: (state) => {
      state.status = "loading";
      //state.errorProcessing = null;
    },
    [getUserId.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.status = "resolved";
      state.userDataId = action.payload;
    },
    [getUserId.rejected]: setError,

    [uploadDataUserProfile.pending]: (state) => {
      state.status = "loading";
      //state.errorProcessing = null;
    },
    [uploadDataUserProfile.fulfilled]: (state, action) => {
      state.userData.data = {
        ...action.payload.data.data,
      };
      state.status = "resolved";
    },
    [uploadDataUserProfile.rejected]: setError,
  },
});

export default userProfileData.reducer;
export const { setUserData, uploadDataUser } = userProfileData.actions;
