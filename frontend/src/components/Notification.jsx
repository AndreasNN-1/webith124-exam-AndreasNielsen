import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import "./Notification.scss";

const Notification = ({ notification, time, handleClose }) => {


  // start timer to close Notification after time * 1000
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose(notification.id);
    }, time * 1000);


    // remove setTimeout if commpont is gone
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="notification">
      <div className="timer">
        <div
          className="timebar"
          style={{animation: `timer ${time}s linear` }}
        />
      </div>
      <div className="content">
        <div className={`status ${notification.status === 200 ? "ok" : "bad"}`}>
          {notification.status === 200 ? <IoMdCheckmark /> : <IoMdClose />}
        </div>
        <div className="texts">
          <h4>{notification.title}</h4>
          <p>{notification.text}</p>
        </div>
        <button className="close" onClick={() => handleClose(notification.id)}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default Notification;
