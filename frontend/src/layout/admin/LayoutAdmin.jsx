import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import NavAdmin from "./NavAdmin";
import "./LayoutAdmin.scss";

const LayoutAdmin = () => {
  const { user } = useContext(LoginContext);
  const location = useLocation();

  useEffect(() => {
    const newPageTitle = location.pathname.slice(1).split("/").join(" - ").replace("%C3%A6", "æ");
    document.title = newPageTitle;
  }, [location]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div id="Admin">
      <NavAdmin />
      <main id="Admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
