import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram } from "react-icons/fa";
import "./Header.scss";;

const Header = () => {
  const { user } = useContext(LoginContext);
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuActive((prevState) => !prevState);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolling(true);
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
      <div className="logo-container">
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
          <li>
            <NavLink
              to="/ture"
              className={({ isActive }) => (isActive ? "active" : "")}>
              <div className="bar" />
              <span>Ture</span>
            </NavLink>
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
          <div className="burger-menu-container">
            <div className={`burger-menu ${isMobileMenuActive ? 'active' : ''}`} aria-label="Menu" onClick={toggleMobileMenu}>
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
            </div>
          </div>
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
              onClick={toggleMobileMenu}
              className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={toggleMobileMenu}
              className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/info"
              onClick={toggleMobileMenu}
              className={({ isActive }) => (isActive ? "active" : "")}>
              Info
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/coolstuff"
              onClick={toggleMobileMenu}
              className={({ isActive }) => (isActive ? "active" : "")}>
              Cool Stuff
            </NavLink>
          </li>
          {user &&
            <li>
              <NavLink
                to="/admin/dashboard"
                onClick={toggleMobileMenu}
                className={({ isActive }) => (isActive ? "active" : "")}>
                Dashboard
              </NavLink>
            </li>
          }
        </menu>
      </div>
    </header>
  );
};

export default Header;
