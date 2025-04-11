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


  // run when url updates
  useEffect(() => {
    if (location.pathname !== "/") {

      // check the comment in LayoutAdmin.jsx
      const newPageTitle = `SpaceVenture - ${location.pathname.slice(1).split("/").join(" - ").replace("%C3%A6", "æ")}`;
      document.title = newPageTitle;
    } else {
      document.title = "SpaceVenture - hjem";
    }


    // go to top
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
