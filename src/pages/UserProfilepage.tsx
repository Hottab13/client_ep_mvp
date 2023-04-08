import { Loader } from "../components/Loader";

import { ProfileContainer } from "../components/Profile/ProfileContainer";
import { useAppSelector } from "../hook";

const UserProfilepage: React.FC = () => {
  const { userData, imgUser, userImgEvents, userEvents } = useAppSelector(
    (state) => state.authUser
  );
  if (document.cookie.indexOf("refreshToken") === 0) {
    console.log("Куки есть");
  } else {
    console.log("Куки нет");
  }
  console.log("кука"+document.cookie)
  const isOwner = true;
  return (
    <ProfileContainer
      userData={userData}
      imgUser={imgUser}
      userEvents={userEvents}
      userImgEvents={userImgEvents}
      isOwner={isOwner}
    />
  );
};
export { UserProfilepage };
