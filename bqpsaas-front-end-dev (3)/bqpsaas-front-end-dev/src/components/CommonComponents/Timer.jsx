import React, { useEffect, useState } from "react";
import { baseUrl } from "../../routes/BaseUrl";
const TimerComponent = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  useEffect(() => {
    const savedStartTime = localStorage.getItem("starttime");
    console.log(savedStartTime);
    if (savedStartTime) {
      setStartTime(savedStartTime);
    }
    const currentTime = new Date();
    console.log(currentTime);
    setEndTime(currentTime);
    calculateTimeSpent(startTime, endTime);
    const handleTabClose = () => {
      const currentTime = new Date();
      setEndTime(currentTime);
      calculateTimeSpent(startTime, endTime);
      localStorage.removeItem("startTime");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  // Function to calculate the time spent in seconds
  const calculateTimeSpent = (start, end) => {
    const endtime = new Date();
    const starttime = localStorage.getItem("starttime");
    const sstarttime = new Date(starttime);
    const timeDifference = Math.abs(endtime.getTime() - sstarttime.getTime());
    const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);
    console.log(timeDifferenceInSeconds);
    setTimeInSeconds(timeDifferenceInSeconds);
    sendDataToAPI(timeDifferenceInSeconds);
  };

  const sendDataToAPI = (totalTimeInSeconds) => {
    const id = localStorage.getItem("id");
    console.log(id);
    const apiUrl = `${baseUrl}active_time/${id}`
    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: localStorage.getItem("id"),
        timeSpent: totalTimeInSeconds,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data sent to API:", data);
      })
      .catch((error) => {
        console.error("Error sending data to API:", error);
      });
  };

  return (
    <div>
      <p>Total Time Consumption: {timeInSeconds} seconds</p>
    </div>
  );
};

export default TimerComponent;
