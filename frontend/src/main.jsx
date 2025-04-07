import React from "react";
import ReactDOM from "react-dom/client";
import LoginContextProvider from "./context/LoginContext";
import App from "./App";
import "./index.css";
import NotificationContextProvider from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotificationContextProvider>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </NotificationContextProvider>
  </React.StrictMode>
);
