import moment from "moment";
import { ReactNode } from "react";
import { useEffect, useState } from "react";

import { useCurrentTime } from "../../hook/useCurrentTime";

type ElementTimerBlogProps = {
  children: ReactNode;
  elName: string;
  color: any;
};
const ElementTimerBlog = ({
  children,
  elName,
  color,
}: ElementTimerBlogProps) => (
  <div className="mx-1 text-gray-400">
    <div className="font-mono leading-none ">{children}</div>
    <div className="font-mono uppercase text-sm leading-none">{elName}</div>
  </div>
);

type EventCountdownTimerProps = {
  startDate: string | Date;
  endDate: string | Date;
};
const EventCountdownTimer: React.FC<EventCountdownTimerProps> = ({
  startDate,
  endDate,
}) => {
  const parsTimeMilliseconds = (date: string | Date) =>
    Math.floor(new Date(date).valueOf());
  const inEventTime = parsTimeMilliseconds(startDate);
  const endEventTime = parsTimeMilliseconds(endDate);
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
    <div className="w-full flex flex-col">
      <div className="min-w-screen text-center flex items-center justify-center ">
        {timeLeft}
      </div>
    </div>
  );
};
export { EventCountdownTimer };
