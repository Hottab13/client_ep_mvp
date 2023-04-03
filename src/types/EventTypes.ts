import { DurationInputArg1 } from "moment";

import { UserData } from "./UserTypes";

export type EventProfile = {
  _id?: string;
  type: string | null;
  startDate: Date | string;
  endDate: Date | string;
  about: string | null;
  address: string | null;
  city: string | null;
  name: string | null;
  amountMaximum: number | null;
  users?: string[];
  ownerUser?: string;
  createdAt?: Date;
  updatedAt?: Date;
  startTime?: DurationInputArg1;
  endTime?: DurationInputArg1;
  eventPhoto?: File;
};
export type ImageUserType = {
  map(
    arg0: ({
      user,
      img_200_200,
      _id,
    }: {
      user: any;
      img_200_200: any;
      _id: any;
    }) => false | JSX.Element
  ): import("react").ReactNode;
  user: string;
  img_200_200: null | {
    data: {
      data: any;
      type: string;
    };
    contentType: string;
    originalname: string;
  };
  img_1000_1000: null | {
    data: {
      data: any;
      type: string;
    };
    contentType: string;
    originalname: string;
  };
};
export type ImageEventType = {
  map(arg0: (e: any) => false | JSX.Element): import("react").ReactNode;
  find(arg0: (e: any) => boolean): unknown;
  _id?: string;
  event: string;
  img_200_200: null | {
    data: {
      data: any;
      type: string;
    };
    contentType: string;
    originalname: string;
  };
  img_1000_1000: null | {
    data: {
      data: any;
      type: string;
    };
    contentType: string;
    originalname: string;
  };
};
export type EventProfileData = {
  eventProfile: EventProfile | null;
  partyUsers: UserData[] | null;
  partyUsersImg: ImageUserType[] | null;
  eventImg: ImageEventType | null;
  ownerUserData: UserData | null;
};
export type EventsResponse = {
  events: {
    docs: EventProfile[];
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  uniqueUsers: UserData[];
  uniqueImgUsers: ImageUserType;
  ImgEvents: ImageEventType;
};
export type InitialStateType = {
  eventsData: EventsResponse | null;
  status: null | string;
  error: string | null | unknown;
  message: string | null;
  hendelDelEvent: boolean;
  eventProfileData: EventProfileData | null;
};
export type EventsParams = {
  limit: string | null;
  type: string | null;
  search: string | null;
  city: string | null;
  page: string | null | number;
};
