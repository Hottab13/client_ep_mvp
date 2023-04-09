import { Navigate, useParams } from "react-router-dom";

import { Loader } from "../components/Loader";
import { EventProfileCard } from "../components/EventProfileComponent/EventProfileCard/EventProfileCard";
import { EventInfoBlog } from "../components/EventProfileComponent/EventInfoBlog";
import { EventPartyBlog } from "../components/EventProfileComponent/EventPartyBlog";
import { EventCountdownTimerBlog } from "../components/EventProfileComponent/EventCountdownTimerBlog";
import { EventInfoOwnerUserBlog } from "../components/EventProfileComponent/EventInfoOwnerUserBlog";
import { useEventData } from "../hook/useEventData";
import { useAppSelector } from "../hook";

const EventProfilepage:React.FC = () => {
  const { id } = useParams();
  const eventProfileData = useEventData(id);
  const { status, hendelDelEvent } = useAppSelector((state) => state.events);
  const authUser = useAppSelector((state) => state.authUser);
  if (status === "loading") return <Loader />; 
  if (hendelDelEvent) return <Navigate to={"/"} replace />;
  return (
    <>
      {eventProfileData && (
        <div className="h-full container mx-auto my-5 p-2 bg-gray-100">
          <EventProfileCard
            eventProfile={eventProfileData.eventProfile}
            eventImg={eventProfileData.eventImg}
            user_id={authUser.userData?._id}
            isAuth={authUser.isAuth}
          />
          <EventCountdownTimerBlog eventProfileData={eventProfileData} />
          <EventInfoOwnerUserBlog
            ownerUserData={eventProfileData.ownerUserData}
          />
          <EventInfoBlog eventProfile={eventProfileData.eventProfile} />
          <EventPartyBlog
            eventProfileData={eventProfileData}
            user_id={authUser.userData?._id}
      />
        </div>
      )}
    </>
  );
};

export { EventProfilepage };
