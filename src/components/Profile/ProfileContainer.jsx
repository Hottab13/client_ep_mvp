import { AboutSection } from "./Sections/AboutSection/AboutSection";
import { ProfileCard } from "./ProfileCard/ProfileCard";
import { FriendsCard } from "./FriendsCard/FriendsCard";
import { UserEventsSection } from "./Sections/UserEventsSection/UserEventsSection";

const ProfileContainer = ({ userData, imgUser, isOwner, userEvents, userImgEvents }) => {
  return (
    <div className="container mx-auto my-5 p-2 bg-gray-100">
      <div className="md:flex  md:-mx-2 ">
        <div className="w-full md:w-4/12 md:mx-2">
          <ProfileCard
            userData={userData}
            imgUser={imgUser}
            isOwner={isOwner}
          />
          <FriendsCard />
        </div>
        <div className="w-full md:w-8/12 md:mx-2 ">
          <AboutSection userData={userData} isOwner={isOwner} />
          <UserEventsSection userEvents={userEvents} u_id={userData._id} userImgEvents={userImgEvents} />
        </div>
      </div>
    </div>
  );
};
export { ProfileContainer };
