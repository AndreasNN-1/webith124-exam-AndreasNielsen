import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import NavAdmin from "./NavAdmin";
import "./LayoutAdmin.scss";

const LayoutAdmin = () => {
  const { user } = useContext(LoginContext);
  const location = useLocation();


  // set pages titles
  useEffect(() => {
    // remove frist / then make the sections into an array the join the array back to one with - then replace %C3%A6 with æ     
    // NOTE idk why it makes it say %C3%A6 
    const newPageTitle = location.pathname.slice(1).split("/").join(" - ").replace("%C3%A6", "æ");
    document.title = newPageTitle;
  }, [location.pathname]);


  // check if user else go away
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
