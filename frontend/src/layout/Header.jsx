import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram } from "react-icons/fa";
import "./Header.scss"; import useRequstData from "../hooks/useRequstData";
import { IoIosArrowDown } from "react-icons/io";
;

const Header = () => {
  const { user } = useContext(LoginContext);

  const APIURL = import.meta.env.VITE_APP_API;

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [dropdown, setDropdown] = useState(false);


  // dont need isLoading or error
  const { makeRequest, isLoading, data, error } = useRequstData();


  useEffect(() => {
    makeRequest(`${APIURL}tours`, "GET");
  }, []);


  // close Dropdown & MobileMenu
  const CloseMobileMenu = () => {
    setIsMobileMenuActive(false);
    setDropdown(false);
  };


  return (
    <header>
      <div className="top-container">
        <div className="burger-menu-container">
          <div className={`burger-menu ${isMobileMenuActive ? 'active' : ''}`} aria-label="Menu" onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}>
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
        </div>
        <NavLink to="/" className="logo">
          <img src="/SiteAssets/icons/logo.png" alt="logo" />
        </NavLink>
      </div>
      <nav className={isMobileMenuActive ? 'active' : ''}>
        <menu>
          <li>
            <NavLink
              to="/"
              onClick={() => CloseMobileMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="bar" />
              <span>Hjem</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rumfærgen"
              onClick={() => CloseMobileMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="bar" />
              <span>Rumfærgen</span>
            </NavLink>
          </li>
          <li className="extra">
            <div>
              <NavLink
                to="/ture"
                onClick={() => CloseMobileMenu()}
                className={({ isActive }) => (isActive ? "active" : "")}>
                <div className="bar" />
                <span>Ture</span>
              </NavLink>

              <button className={`dropdown ${dropdown ? "active" : ""}`} onClick={() => setDropdown(!dropdown)}>
                <IoIosArrowDown />
              </button>
            </div>
            <ul className={`extra-links ${dropdown ? "active" : ""}`}>
              {data && data.length > 0 ? (
                data.slice(0, 3).sort((a, b) => { return new Date(a.spacelaunch) - new Date(b.spacelaunch) }).map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/ture/${item._id}`}
                      onClick={() => CloseMobileMenu()}
                      className={({ isActive }) => (isActive ? "active" : "")}>
                      {item.destination}
                    </NavLink>
                  </li>
                ))
              ) : (
                <li><span>Ingen ture</span></li>
              )}
              {data && data.length >= 4 && (
                <li>
                  <NavLink
                    to="/ture"
                    onClick={() => CloseMobileMenu()}
                    className={({ isActive }) => (isActive ? "active" : "")}>
                    Se Alle
                  </NavLink>
                </li>
              )}

            </ul>
          </li>
          <li>
            <NavLink
              to="/galleri"
              onClick={() => CloseMobileMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="bar" />
              <span>Galleri</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sikkerhed"
              onClick={() => CloseMobileMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="bar" />
              <span>Sikkerhed</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/kontakt"
              onClick={() => CloseMobileMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="bar" />
              <span>Kontakt</span>
            </NavLink>
          </li>
          {user ?
            <li>
              <NavLink
                to="/admin/dashboard"
                onClick={() => CloseMobileMenu()}
                className={({ isActive }) => (isActive ? "active" : "")}>
                <div className="bar" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            :
            <li>
              <NavLink
                to="/login"
                onClick={() => CloseMobileMenu()}
                className={({ isActive }) => (isActive ? "active" : "")}>
                <div className="bar" />
                <span>Login</span>
              </NavLink>
            </li>
          }
        </menu>
        <div className="socials">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://support.google.com/" target="_blank" rel="noopener noreferrer">
            <FaGooglePlusG />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
