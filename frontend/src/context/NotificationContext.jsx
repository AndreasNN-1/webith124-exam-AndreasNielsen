import Notification from "../components/Notification";
import { createContext, useState } from "react";
import "./NotificationContext.scss";
import Confirmation from "../components/Confirmation";

export const NotificationContext = createContext();

const Time = 6;
const MaxNotifications = 3;

const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [ConfirmationData, setConfirmation] = useState({ title: "", text: "", resolve: null });


  // make id useing Math, 200IQ
  const generateUniqueId = () => {
    return Math.random().toString(10);
  };

  // Add new notification
  const RunNotification = (status, title, text) => {
    const newNotification = {
      id: generateUniqueId(),
      status,
      title,
      text,
      width: "100%",
    };


    // Add new notification to array and remove oldest if over limet
    setNotifications((prev) => {
      if (prev.length >= MaxNotifications) {
        // remove index 1 and add new notification
        return [...prev.slice(1), newNotification];
      }
      // add to array
      return [...prev, newNotification];
    });
  };



  // remove notfi id from the arry
  const handleClose = (id) => {
    setNotifications((prev) =>
      prev.filter((Notification) => Notification.id !== id)
    );
  };





  // show the Confirmation commpont and make a Promise
  const RunConfirmation = (title, text) => {
    return new Promise((resolve) => {
      setConfirmation({ title, text, resolve });
    });
  };


  // wait for ConfirmationOutput then set resolve to true or false
  const ConfirmationClose = (output) => {
    //check resolve = true / fals
    if (ConfirmationData.resolve) {
      ConfirmationData.resolve(output);
    }
    setConfirmation({ title: "", text: "", resolve: null });
  };

  return (
    <NotificationContext.Provider value={{ RunNotification, RunConfirmation }}>
      {children}
      <>
        {notifications.length > 0 && (
          <div className="notifications-container">
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                notification={notification}
                time={Time}
                handleClose={handleClose}
              />
            ))}
          </div>
        )}

        {ConfirmationData.title && (
          <Confirmation
            ConfirmationData={ConfirmationData}
            ConfirmationOutput={ConfirmationClose}
          />
        )}
      </>
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
