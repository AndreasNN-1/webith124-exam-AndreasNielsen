import Notification from "../components/Notification";
import { createContext, useState } from "react";
import "./NotificationContext.scss";
import Confirmation from "../components/Confirmation";

export const NotificationContext = createContext();

const Time = 6;
const MaxNotifications = 3;

const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [ConfirmationData, setConfirmation] = useState({
    title: "",
    text: "",
    resolve: null,
  });

  const generateUniqueId = () => {
    return Math.random().toString(10);
  };

  const RunNotification = (status, title, text) => {
    const newNotification = {
      id: generateUniqueId(),
      status,
      title,
      text,
      width: "100%",
    };

    setNotifications((prev) => {
      if (prev.length >= MaxNotifications) {
        return [...prev.slice(1), newNotification];
      }
      return [...prev, newNotification];
    });
  };
  const handleClose = (id) => {
    setNotifications((prev) =>
      prev.filter((Notification) => Notification.id !== id)
    );
  };

  const ConfirmationClose = (output) => {
    if (ConfirmationData.resolve) {
      ConfirmationData.resolve(output === "Confirmed");
    }
    setConfirmation({ title: "", text: "", resolve: null });
  };

  const RunConfirmation = (title, text) => {
    return new Promise((resolve) => {
      setConfirmation({ title, text, resolve });
    });
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
