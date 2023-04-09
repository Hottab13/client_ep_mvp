import moment from "moment";
import { ReactNode, useEffect, useState } from "react";

import { useCurrentTime } from "../../hook/useCurrentTime";
import { EventProfileData } from "../../types/EventTypes";

interface ElementTimerBlogProps {
  children: ReactNode;
  elName: string;
  color: boolean;
}
const ElementTimerBlog = ({
  children,
  elName,
  color,
}: ElementTimerBlogProps) => (
  <div
    className={
      color
        ? "sm:w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg"
        : "sm:w-24 mx-1 p-2 bg-white text-green-500 rounded-lg"
    }
  >
    <div className="font-mono leading-none">{children}</div>
    <div className="font-mono uppercase text-sm leading-none">{elName}</div>
  </div>
);

interface EventCountdownTimerBlogProps {
  eventProfileData: EventProfileData;
}
const EventCountdownTimerBlog: React.FC<EventCountdownTimerBlogProps> = ({
  eventProfileData,
}) => {
  const parsTimeMilliseconds = (date: Date | string) =>
    Math.floor(new Date(date).valueOf());
  let inEventTime = 0,
    endEventTime = 0;
  if (eventProfileData.eventProfile) {
    inEventTime = parsTimeMilliseconds(eventProfileData.eventProfile.startDate);
    endEventTime = parsTimeMilliseconds(eventProfileData.eventProfile.endDate);
  }
  const currentTime = useCurrentTime();

  const calculateTimeLeft = () => {
    let leftTime = null;
    if (inEventTime >= currentTime) {
      leftTime = inEventTime - currentTime;
    } else if (endEventTime >= currentTime) {
      leftTime = endEventTime - currentTime;
    }
    const duration = moment.duration(leftTime, "milliseconds");
    const days = Math.floor(moment.duration(leftTime).asDays());
    return (
      <>
        <ElementTimerBlog elName={"Дней"} color={inEventTime >= currentTime}>
          {days}
        </ElementTimerBlog>
        <ElementTimerBlog elName={"Часов"} color={inEventTime >= currentTime}>
          {duration.hours()}
        </ElementTimerBlog>
        <ElementTimerBlog elName={"Минут"} color={inEventTime >= currentTime}>
          {duration.minutes()}
        </ElementTimerBlog>
        <div className="text-2xl mx-1 font-extralight">и</div>
        <ElementTimerBlog elName={"Секунд"} color={inEventTime >= currentTime}>
          {duration.seconds()}
        </ElementTimerBlog>
      </>
    );
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return (
    <div className="my-4 flex flex-col space-y-4 ">
      <div className="w-full flex flex-col">
        <div
          className={
            inEventTime <= currentTime
              ? "flex-1  bg-green-500 rounded-lg shadow-xl p-8"
              : "flex-1 bg-yellow-500  rounded-lg shadow-xl p-8"
          }
        >
          <div className="min-w-screen flex items-center justify-center sm:px-5 sm:py-5">
            <div
              className={
                inEventTime <= currentTime
                  ? "text-green-100"
                  : "text-yellow-100"
              }
            >
              {inEventTime <= currentTime ? (
                <h1 className="text-3xl text-center mb-3 font-extralight">
                  Событие началось
                </h1>
              ) : (
                <h1 className="text-3xl text-center mb-3 font-extralight">
                  Событие начнется через
                </h1>
              )}
              <div className="text-3xl sm:text-5xl text-center flex w-full items-center justify-center">
                {timeLeft}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { EventCountdownTimerBlog };
