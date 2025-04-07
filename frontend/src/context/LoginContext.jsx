import { createContext, useState, useEffect, useContext } from "react";
import { NotificationContext } from "./NotificationContext";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const { RunNotification } = useContext(NotificationContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const APIURL = import.meta.env.VITE_APP_API;

  // check log in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser === import.meta.env.VITE_APP_EMAIL) {
      setUser(storedUser);
    } else {
      localStorage.removeItem("user");
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  // Log in
  const signIn = async (inputIdentity, inputPassword) => {
    if (inputIdentity === import.meta.env.VITE_APP_EMAIL && inputPassword === import.meta.env.VITE_APP_PASSWORD) {
      localStorage.setItem("user", inputIdentity);
      setUser(inputIdentity);
      RunNotification(200, "Login", "successfully Loged in!");
      return { status: 200 };
    } else {
      return { status: 401, message: "Forkert e-mail eller adgangskode" };
    }
  };


  // Log out
  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    RunNotification(200, "Logout", "successfully Loged out!");
  };

  if (isLoading) {
    return null;
  }

  return (
    <LoginContext.Provider value={{ signIn, signOut, user }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
