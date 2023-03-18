import moment from "moment";
import { useEffect, useState } from "react";

const ElementTimerBlog = ({ children, elName, color }) => (
  <div className="mx-1 text-gray-400">
    <div className="font-mono leading-none ">{children}</div>
    <div className="font-mono uppercase text-sm leading-none">{elName}</div>
  </div>
);

const EventCountdownTimer = ({ startDate, endDate }) => {
  const parsTimeMilliseconds = (date) => Math.floor(new Date(date).valueOf());
  const inEventTime = parsTimeMilliseconds(startDate);
  const endEventTime = parsTimeMilliseconds(endDate);
  const currentTime = Math.floor(new Date().valueOf() + 10800000);

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
