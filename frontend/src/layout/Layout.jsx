import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { LoginContext } from "../context/LoginContext";
import Loader from "../components/Loader";

const Layout = () => {
  const { loading } = useContext(LoginContext);
  if (loading) {
    return <Loader />;
  }

  const location = useLocation();

  useEffect(() => {
    const newPageTitle = `SpaceVenture - ${location.pathname}`;
    if (location.pathname === "/") {
      document.title = newPageTitle.replace("/", "home");
    } else {
      document.title = newPageTitle.replace("/", "");
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [location]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
