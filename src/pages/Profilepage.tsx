import { useParams } from "react-router-dom";

import { useUserData } from "../hook/useUserData";
import { Loader } from "../components/Loader";
import { ProfileContainer } from "../components/Profile/ProfileContainer";
import { useAppSelector } from "../hook";

const Profilepage: React.FC = () => {
  const { id } = useParams();
  const userData = useUserData(id);
  const { status } = useAppSelector((state) => state.authUser);
  const isOwner = false;
  if (status === "loading") return <Loader />;
  return (
    <>
      {userData && (
        <ProfileContainer
          userData={userData.userData}
          imgUser={userData.imgUser}
          isOwner={isOwner}
          userEvents={userData.userEvents}
          userImgEvents={userData.userImgEvents}
        />
      )}
    </>
  );
};

export { Profilepage };
