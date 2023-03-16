import { AboutSection } from "./AboutSection/AboutSection";
import { ProfileCard } from "./ProfileCard/ProfileCard";
import { FriendsCard } from "./FriendsCard/FriendsCard";
import { UserEventsSection } from "./UserEventsSection/UserEventsSection";

const ProfileContainer = ({ userData, imgUser, isOwner, userEvents }) => {
  return (
    <div className="container mx-auto my-5 p-5 bg-gray-100">
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2">
          <ProfileCard
            userData={userData}
            imgUser={imgUser}
            isOwner={isOwner}
          />
          <FriendsCard />
        </div>
        <div className="w-full md:w-9/12 mx-2 h-64">
          <AboutSection userData={userData} isOwner={isOwner} />
          <UserEventsSection userEvents={userEvents} u_id={userData._id} />
        </div>
      </div>
    </div>
  );
};
export { ProfileContainer };
