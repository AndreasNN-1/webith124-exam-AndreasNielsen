import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import "./Header.scss";;

const Header = () => {
  const { user } = useContext(LoginContext);
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const Loca = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuActive((prevState) => !prevState);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      toggleMobileMenu();
    }
  };

  useEffect(() => {
    if (Loca.pathname.split("/")[1] === "search") {
      setSearchTerm("");
    }
  }, [Loca.pathname]);

  return (
    <header>
      <nav>
        <NavLink to="/" className="logo">
          <img src="/SiteAssets/logo.png" alt="logo" />
        </NavLink>
        <menu>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/info"
              className={({ isActive }) => (isActive ? "active" : "")}>
              Info
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/coolstuff"
              className={({ isActive }) => (isActive ? "active" : "")}>
              Cool Stuff
            </NavLink>
          </li>
          {user &&
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}>
                Dashboard
              </NavLink>
            </li>
          }
          <li>
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </li>
        </menu>
        <div className="burger-menu-container">
          <div className={`burger-menu ${isMobileMenuActive ? 'active' : ''}`} aria-label="Menu" onClick={toggleMobileMenu}>
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
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
          <li>
            <NavLink
              to="/search"
              onClick={toggleMobileMenu}
              className={({ isActive }) => (isActive ? "active" : "")}>
              Search
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
