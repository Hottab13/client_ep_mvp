import { useSelector } from "react-redux";

import { Loader } from "../components/Loader";

import { ProfileContainer } from "../components/Profile/ProfileContainer";

const UserProfilepage = () => {
  const { userData, imgUser, userEvents, status } = useSelector(
    (state) => state.userProfileData || {}
  );
  if (status === "loading") return <Loader />;
  const isOwner = true;
  return (
    <ProfileContainer
      userData={userData}
      imgUser={imgUser}
      userEvents={userEvents}
      isOwner={isOwner}
    />
  );
};
export { UserProfilepage };
