import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    const newPageTitle = `SpaceVenture - ${location.pathname}`;
    if (location.pathname === "/") {
      document.title = newPageTitle.replace("/", "home");
    } else {
      document.title = newPageTitle.replace("/", "");
    }
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
