import { createContext, useState, useEffect, useContext } from "react";
import { NotificationContext } from "./NotificationContext";
import useRequstData from "../hooks/useRequstData";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const { makeRequest: makeRequestlogin, isLoading: isLoadinglogin, data: datalogin, error: errorlogin } = useRequstData();
  const { makeRequest: makeRequestClecklogin, isLoading: isLoadingClecklogin, data: dataClecklogin, error: errorClecklogin } = useRequstData();
  const { makeRequest: makeRequestlogOut, isLoading: isLoadinglogOut, data: datalogOut, error: errorlogOut } = useRequstData();
  const { RunNotification } = useContext(NotificationContext);
  const [user, setUser] = useState(null);
  const APIURL = import.meta.env.VITE_APP_API;
  const storedUser = localStorage.getItem('user');

  // Check Log in
  useEffect(() => {
    makeRequestClecklogin(`${APIURL}login/loggedin`, "GET");
  }, []);

  useEffect(() => {
    if (dataClecklogin) {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    if (errorClecklogin) {
      setUser(null);
      localStorage.removeItem("user");
    }
    setLoading(false);
  }, [dataClecklogin, errorClecklogin]);

  // Log in
  const signIn = (inputIdentity, inputPassword) => {
    const body = {
      email: inputIdentity,
      password: inputPassword,
    };
    makeRequestlogin(`${APIURL}login/login`, "POST", body);
  };

  useEffect(() => {
    if (!isLoadinglogin) {
      if (datalogin) {
        localStorage.setItem("user", JSON.stringify(datalogin));
        setUser(datalogin);
        RunNotification(200, "Login", "med succes logget ind!");
      }
      if (errorlogin) {
        localStorage.removeItem('user');
        RunNotification(400, "Mislykket", "e-mail eller adgangskode stemmer ikke overens");
      }
    }
  }, [datalogin, errorlogin, isLoadinglogin]);

  // Log out
  const signOut = () => {
    makeRequestlogOut(`${APIURL}login/logout`, "GET");
  };

  useEffect(() => {
    if (datalogOut) {
      setUser(null);
      localStorage.removeItem('user');
      RunNotification(200, "Logout", "succesfuldt logget ud!");
    }
    if (errorlogOut) {
      console.error("Error: " + errorlogOut);
    }
  }, [datalogOut, errorlogOut]);



  if (loading) {
    return null;
  }

  return (
    <LoginContext.Provider value={{ signIn, signOut, user }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
