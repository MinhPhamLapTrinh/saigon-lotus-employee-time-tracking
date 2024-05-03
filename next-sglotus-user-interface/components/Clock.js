import { useState, useEffect } from "react";
export default function Clock() {
  const [currDate, setCurrDate] = useState(null);
  useEffect(() => {
    setCurrDate(new Date());
    // update the date once every second
    const timerID = setInterval(() => {
      setCurrDate(new Date());
    }, 1000);
    return () => {
      // clean up the effect
      clearInterval(timerID);
    };
  }, []);
  const hour = new Date(currDate).getHours();
  const minute = new Date(currDate).getMinutes();
  const date = new Date(currDate).toDateString();
  
  return (
    <>
      <p className="text-1xl font-mono text-white font-bold">{date} </p>
      <h1 className="text-5xl font-mono text-white font-bold">
        {(hour < 10 ? "0" + hour : hour) +
          ":" +
          (minute < 10 ? "0" + minute : minute)}{" "}
      </h1>
    </>
  );
}
