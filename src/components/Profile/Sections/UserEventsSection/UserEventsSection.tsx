import { BlockHeader } from "../BlockHeader";
import { EventsSection } from "../../../EventsSection";
import { EventProfile, ImageEventType } from "../../../../types/EventTypes";

type UserEventsSectionProps = {
  userEvents: EventProfile[] | null;
  userImgEvents: ImageEventType[] | null;
};
const UserEventsSection: React.FC<UserEventsSectionProps> = ({
  userEvents,
  userImgEvents,
}) => (
  <div className="bg-white p-3 mb-4 rounded-lg shadow-lg hover:shadow-xl">
    <BlockHeader
      d={
        "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      }
    >
      Мои события
    </BlockHeader>
    <EventsSection
      eventsData={userEvents}
      ImgEvents={userImgEvents}
      markupGrid={"md:w-1/4"}
    />
  </div>
);
export { UserEventsSection };
