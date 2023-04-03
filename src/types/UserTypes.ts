import { EventProfile, ImageUserType } from "./EventTypes";

export type SetErrorType = {
  message: null | string | undefined;
  errors:
    | null
    | {
        value: string;
        msg: string;
        param: string;
        location: string;
      }[];
};

export type DataInfo = {
  userName: string;
  userSurname: string | null;
  userGender: string | null;
  userPhone: string | null;
  usersDateBirth: Date | null | string;
  status: string | null;
  aboutMe: string | null;
};
export type UserData = {
  _id: string;
  email: string;
  isActivated: boolean;
  createdAt: Date | null;
  data: DataInfo;
};
export type GetUserData = {
  userData: UserData;
  imgUser: ImageUserType | null;
  userEvents: EventProfile[] | null;
  userImgEvents: ImageUserType[] | null;
};
export type AuthState = {
  status: null | string;
  isAuth: boolean;
  isRegistration: boolean;
  message: null | string | undefined;
  errorProcessing: SetErrorType | undefined;
  userData: UserData | null;
  imgUser: ImageUserType | null;
  userEvents: EventProfile[] | null;
  userImgEvents: ImageUserType[] | null;
  userDataId: GetUserData | null;
};
export type LoginUserProps = {
  email: string;
  password: string;
  remember_me?: string| null;
};
export type RegistrationUserProps = {
  email: string;
  password: string;
  userName: string;
  confirm_password?:string;
};
