import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../hook";
import { getUserId } from "../redux/slices/authSlice";
import { GetUserData } from "../types/UserTypes";

const useUserData = (id: string | undefined): GetUserData | undefined => {
  const dispatch = useAppDispatch();
  const { userDataId } = useAppSelector((state) => state.authUser);
  useEffect(() => {
    dispatch(getUserId(id));
  }, [dispatch, id]);
  if (userDataId) {
    return userDataId;
  }
};
export { useUserData };
