import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import NavAdmin from "./NavAdmin";
import "./LayoutAdmin.scss";

const LayoutAdmin = () => {
  const { user } = useContext(LoginContext);
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  const location = useLocation();

  useEffect(() => {
    const newPageTitle = location.pathname.slice(1).split("/").join(" - ");
    document.title = newPageTitle;
  }, [location]);

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
