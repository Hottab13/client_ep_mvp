import { Loader } from "../components/Loader";

import { ProfileContainer } from "../components/Profile/ProfileContainer";
import { useAppSelector } from "../hook";

const UserProfilepage:React.FC = () => {
  const { userData, imgUser,userImgEvents, userEvents } = useAppSelector(
    (state) => state.authUser);
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
