import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { NotificationContext } from "../../context/NotificationContext";
import { BiSolidDashboard } from "react-icons/bi";
import { FaHome, FaRocket, FaShip } from "react-icons/fa";
import { MdAccountBox, MdLogout } from "react-icons/md";
import { LuPanelLeftClose } from "react-icons/lu";

import "./NavAdmin.scss";

const NavAdmin = () => {
  const { signOut, user } = useContext(LoginContext);
  const { RunConfirmation } = useContext(NotificationContext);
  const [closed, setClosed] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const Logout = async () => {
    const YesTosignOut = await RunConfirmation(
      "Logout?",
      "Do you want to Logout?"
    );
    if (YesTosignOut) {
      signOut();
    }
  };

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
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaHome />
            <span>Forsiden</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <BiSolidDashboard />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/ture"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaRocket />
            <span>Ture</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/rumfærgen"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaShip />
            <span>Rumfærgen</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/account"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <MdAccountBox />
            <span>Account</span>
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
