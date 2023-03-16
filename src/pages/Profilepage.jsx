import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useUserData } from "../hook/useUserData";
import { Loader } from "../components/Loader";
import { ProfileContainer } from "../components/Profile/ProfileContainer";

const Profilepage = () => {
  const { id } = useParams();
  const userData = useUserData(id);
  const { status } = useSelector((state) => state.userProfileData || {});
  const isOwner = false;
  if (status === "loading") return <Loader />;
  return (
    <Fragment>
      {userData && (
        <ProfileContainer
          userData={userData.user}
          imgUser={userData.imgUser}
          isOwner={isOwner}
          userEvents={userData.userEvents}
        />
      )}
    </Fragment>
  );
};

export { Profilepage };
