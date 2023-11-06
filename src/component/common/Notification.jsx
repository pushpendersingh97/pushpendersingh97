import React, { useState, useEffect, useRef } from "react";
import notificationIcon from "../../assets/notification.svg";
import announcement from "../../assets/announcement.svg";
import gainer from "../../assets/gainer.svg";
import losser from "../../assets/losser.svg";

const notificationData = [
  {
    id: 121,
    img: gainer,
    heading: "asd AVG Logistics Ltd. (AVG) is up +3.00% in the last 2 hours",
    type: "losser",
    time: "40m",
  },
  {
    id: 122,
    img: announcement,
    heading: "Ceat Ltd. (CEATLTD) is down -5.00% in the last 6 hours",
    type: "announcement",
    time: "30m",
  },
  {
    id: 123,
    img: gainer,
    heading: "AVG Logistics Ltd. (AVG) is up +3.00% in the last 2 hours",
    type: "gainer",
    time: "30m",
  },
  {
    id: 124,
    img: announcement,
    heading: "Ceat Ltd. (CEATLTD) is down -5.00% in the last 6 hours",
    type: "announcement",
    time: "30m",
  },
  {
    id: 125,
    img: losser,
    heading: "India's first Opto-Semiconductor Chip Manufacturer files DHRP",
    type: "losser",
    time: "30m",
  },
];

function Notification() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [count, setCount] = useState(0); // Initialize count to 0
  const [data] = useState(notificationData);
  const notifiBoxRef = useRef(null);
  const notifiIconRef = useRef(null);

  const toggleNotifi = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      notifiBoxRef.current &&
      !notifiBoxRef.current.contains(event.target) &&
      notifiIconRef.current &&
      !notifiIconRef.current.contains(event.target)
    ) {
      setIsNotificationOpen(false);
    }
  };

  useEffect(() => {
    if (isNotificationOpen) {
      setCount(0)
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Use setInterval to increment count every 2 minutes
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    },  2 * 60 * 1000); // 2 minutes in milliseconds

    // Clear the interval on component unmount
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen, count]);

  // Filter notifications that are 30 minutes old
  const filteredNotifications = data.filter((item) => {
    // Assuming the time property is in "Xm" format (e.g., "30m")
    const minutesAgo = parseInt(item.time);
    return minutesAgo <= 30;
  });

  return (
    <>
      <div className="icon" onClick={toggleNotifi} ref={notifiIconRef}>
        <img src={notificationIcon} alt="bell" />
        { count === 0 ? (<></>) : (<div className="info-count">{count}</div>)}
      </div>
      {isNotificationOpen && (
        <div
          className={`notifi-box ${isNotificationOpen ? "open" : ""}`}
          ref={notifiBoxRef}
        >
          <h2>Notifications <span className="heading-sub-text">({data.length})</span> </h2>
          <div className="notifi-item-wrapper">
            {filteredNotifications.map((item) => {
              return (
                <div className="notifi-item" key={item.id}>
                  <img src={item.img} alt="img" />
                  <div className="text">
                    <h4>{item.heading}</h4>
                    <span className="time-text">{item.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Notification;
