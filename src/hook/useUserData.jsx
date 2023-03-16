import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserId } from "../redux/slices/userSlice";

const useUserData = (id) => {
  const dispatch = useDispatch();
  const { userDataId } = useSelector((state) => state.userProfileData || {});
  useEffect(() => {
    dispatch(getUserId(id));
  }, [dispatch, id]);
  return userDataId;
};
export { useUserData };
