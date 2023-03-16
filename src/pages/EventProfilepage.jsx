import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import { Loader } from "../components/Loader";
import { EventProfileCard } from "../components/EventProfileComponent/EventProfileCard/EventProfileCard";
import { EventInfoBlog } from "../components/EventProfileComponent/EventInfoBlog";
import { EventPartyBlog } from "../components/EventProfileComponent/EventPartyBlog";
import { EventCountdownTimerBlog } from "../components/EventProfileComponent/EventCountdownTimerBlog";
import { EventInfoOwnerUserBlog } from "../components/EventProfileComponent/EventInfoOwnerUserBlog";
import { useEventData } from "../hook/useEventData";

const EventProfilepage = () => {
  const { id } = useParams();
  const eventData = useEventData(id);
  const { eventProfileData, status, hendelDelEvent } = useSelector(
    (state) => state.events || {}
  );
  const { _id } = useSelector((state) => state.userProfileData.userData || {});
  const { isAuth } = useSelector((state) => state.authUser || {});
  if (status === "loading") return <Loader />;
  if (hendelDelEvent) return <Navigate to={"/"} replace />;
  return (
    <>
      {eventData && (
        <div className="h-full bg-gray-100 p-5">
          <EventProfileCard
            eventProfile={eventData}
            eventImg={eventProfileData.eventImg}
            user_id={_id}
            isAuth={isAuth}
          />
          <EventCountdownTimerBlog eventProfileData={eventProfileData} />
          <EventInfoOwnerUserBlog
            ownerUserData={eventProfileData.ownerUserData}
          />
          <EventInfoBlog eventProfile={eventData} />
          <EventPartyBlog eventProfileData={eventProfileData} user_id={_id} />
        </div>
      )}
    </>
  );
};

export { EventProfilepage };
