import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { NotificationContext } from "../../context/NotificationContext";
import { BiSolidDashboard } from "react-icons/bi";
import { FaHome, FaRocket, FaShip } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { LuPanelLeftClose } from "react-icons/lu";

import "./NavAdmin.scss";

const NavAdmin = () => {
  const { signOut, user } = useContext(LoginContext);
  const { RunConfirmation } = useContext(NotificationContext);
  const [closed, setClosed] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  // check window width when resizing the page
  useEffect(() => {

    const handleResize = () => {
      // set true / false
      setIsMobile(window.innerWidth < 767);
    };

    // insta run
    handleResize();



    // add addEventListener
    window.addEventListener('resize', handleResize);

    // remove addEventListener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // logOut user if yes
  const Logout = async () => {

    // again am good at names
    const YesTosignOut = await RunConfirmation("Logout?", "Do you want to Logout?");
    if (YesTosignOut) {
      signOut();
    }
  };


  // close menu
  const toggleMobileMenu = () => {
    setOpen(false);
  };

  return (
    <nav id="Admin-Nav" className={isMobile ? "" : (closed ? "closed" : "")}>
      <div className="site-logo">
        <NavLink to="/admin/dashboard" className="logo">
          <img src="/SiteAssets/icons/favicon.ico" alt="logo" />
        </NavLink>
        <div className="button-con">
          <button id="OpenToggle" onClick={() => setClosed(!closed)}>
            <LuPanelLeftClose />
          </button>
        </div>
      </div>
      <menu className={`burger-menu ${open ? 'active' : ''}`}>
        <li>
          <NavLink
            to="/"
            onClick={() => toggleMobileMenu()}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaHome />
            <span>Forsiden</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard"
            onClick={() => toggleMobileMenu()}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <BiSolidDashboard />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/ture"
            onClick={() => toggleMobileMenu()}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaRocket />
            <span>Ture</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/rumfærgen"
            onClick={() => toggleMobileMenu()}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaShip />
            <span>Rumfærgen</span>
          </NavLink>
        </li>
        <li>
          <button className="LogOut" onClick={() => Logout()}>
            <span>logout</span>
            <MdLogout />
          </button>
        </li>
      </menu>
      <div className="opsions">
        <div className="profile">
          <figure>
            <img
              src="/SiteAssets/images/Jill.jpg"
              alt="profile image"
            />
          </figure>
          <h5>{user ? user.name : "user"}</h5>
        </div>
        <button className="LogOut" onClick={() => Logout()}>
          <span>logout</span>
          <MdLogout />
        </button>
        <div className={`burger-menu ${open ? 'active' : ''}`} aria-label="Menu" onClick={() => setOpen(!open)}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      </div>
    </nav>
  );
};

export default NavAdmin;
