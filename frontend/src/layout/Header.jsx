import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram } from "react-icons/fa";
import "./Header.scss"; import useRequstData from "../hooks/useRequstData";
;

const Header = () => {
  const { user } = useContext(LoginContext);
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { makeRequest, isLoading, data, error } = useRequstData();
  const APIURL = import.meta.env.VITE_APP_API;
  useEffect(() => {
    makeRequest(`${APIURL}tours`, "GET");
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuActive((prevState) => !prevState);
  };

  const handleScroll = () => {
    if (window.innerWidth > 767) {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolling ? "scrolling" : ""}>
      <div className="top-container">
        <div className="burger-menu-container">
          <div className={`burger-menu ${isMobileMenuActive ? 'active' : ''}`} aria-label="Menu" onClick={toggleMobileMenu}>
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
        </div>
        <NavLink to="/" className="logo">
          <img src="/SiteAssets/icons/logo.png" alt="logo" />
        </NavLink>
      </div>
      <nav>
        <menu>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="bar" />
              <span>Hjem</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rumfærgen"
              className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="bar" />
              <span>Rumfærgen</span>
            </NavLink>
          </li>
          <li className="extra">
            <NavLink
              to="/ture"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <div className="bar" />
              <span>Ture</span>
            </NavLink>

            <ul className="extra-links">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/ture/${item._id}`}
                      className={({ isActive }) => (isActive ? "active" : "")}>
                      {item.destination}
                    </NavLink>
                  </li>
                ))
              ) : (
                <li><span>Ingen ture</span></li>
              )}
            </ul>
          </li>
          <li>
            <NavLink
              to="/galleri"
              className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="bar" />
              <span>Galleri</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sikkerhed"
              className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="bar" />
              <span>Sikkerhed</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/kontakt"
              className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="bar" />
              <span>Kontakt</span>
            </NavLink>
          </li>
          {user &&
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}>
                <div className="bar" />
                <span>Dashboard</span>
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
      <div className={`mobile-menu ${isMobileMenuActive ? 'active' : ''}`} aria-label="Mobilmenu">
        <menu>
          <li>
            <NavLink
              to="/"
              onClick={() => toggleMobileMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}>
              <span>Hjem</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rumfærgen"
              onClick={() => toggleMobileMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}>
              <span>Rumfærgen</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ture"
              onClick={() => toggleMobileMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}>
              <span>Ture</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/galleri"
              onClick={() => toggleMobileMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}>
              <span>Galleri</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sikkerhed"
              onClick={() => toggleMobileMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}>
              <span>Sikkerhed</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/kontakt"
              onClick={() => toggleMobileMenu()}
              className={({ isActive }) => (isActive ? "active" : "")}>
              <span>Kontakt</span>
            </NavLink>
          </li>
          {user &&
            <li>
              <NavLink
                to="/admin/dashboard"
                onClick={() => toggleMobileMenu()}
                className={({ isActive }) => (isActive ? "active" : "")}>
                <span>Dashboard</span>
              </NavLink>
            </li>
          }
        </menu>
      </div>
    </header>
  );
};

export default Header;
