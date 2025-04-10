import React, { useContext, useEffect, useState } from "react";
import "./Footer.scss";
import Loader from "../components/Loader";
import Error from "../components/Error";
import useRequstData from "../hooks/useRequstData";
import {
  FaFacebookF,
  FaGooglePlusG,
  FaInstagram,
  FaRegCopyright,
  FaTwitter,
  FaDirections,
  FaBuilding,
  FaClock,
} from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdMail, IoIosArrowDown } from "react-icons/io";
import { LoginContext } from "../context/LoginContext";
import { NavLink } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

const Footer = () => {
  const { user } = useContext(LoginContext);
  const { makeRequest, isLoading, data, error } = useRequstData();
  const [show, setShow] = useState(false);
  const APIURL = import.meta.env.VITE_APP_API;
  useEffect(() => {
    makeRequest(`${APIURL}footer`, "GET");
  }, []);

  const ToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollY / totalHeight) * 100;

    if (scrollPercentage > 75) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <footer>
      <button
        onClick={() => ToTop()}
        id="toTop"
        className={show ? "active" : ""}
      >
        <IoIosArrowDown />
      </button>
      <menu>
        <div className="kontact">
          <h5>KONTAKT</h5>
          {isLoading && <Loader />}
          {error && <Error />}
          {data && (
            <ul>
              {data.phone ? (
                <li>
                  <a href={`tel:${data.phone}`} target="_blank">
                    <BsFillTelephoneFill />
                    <span>{data.phone}</span>
                  </a>
                </li>
              ) : null}
              {data.email ? (
                <li>
                  <a href={`mailto:${data.email}`} target="_blank">
                    <IoMdMail />
                    <span>{data.email}</span>
                  </a>
                </li>
              ) : null}
              {data.address ? (
                <li>
                  <a
                    href={`https://www.google.pl/maps/search/${data.address.replace(
                      / /g,
                      "+"
                    )}`}
                    target="_blank"
                  >
                    <FaDirections />
                    <span>{data.address}</span>
                  </a>
                </li>
              ) : null}
              {data.cvr ? (
                <li>
                  <a href="/kontakt">
                    <FaBuilding />
                    <span>CVR: {data.cvr}</span>
                  </a>
                </li>
              ) : null}
              {data.openinghours ? (
                <li>
                  <a href="/kontakt">
                    <FaClock />
                    <span>Åbningstider: {data.openinghours}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          )}
        </div>
        <div className="links">
          <h5>HURTIG LINKS</h5>
          <ul>
            <li>
              <GoDotFill />
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span>Hjem</span>
              </NavLink>
            </li>
            <li>
              <GoDotFill />
              <NavLink
                to="/rumfærgen"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span>Rumfærgen</span>
              </NavLink>
            </li>
            <li>
              <GoDotFill />
              <NavLink
                to="/ture"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span>Ture</span>
              </NavLink>
            </li>
            <li>
              <GoDotFill />
              <NavLink
                to="/galleri"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span>Galleri</span>
              </NavLink>
            </li>
            <li>
              <GoDotFill />
              <NavLink
                to="/sikkerhed"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span>Sikkerhed</span>
              </NavLink>
            </li>
            <li>
              <GoDotFill />
              <NavLink
                to="/kontakt"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span>Kontakt</span>
              </NavLink>
            </li>
            {user && (
              <li>
                <GoDotFill />
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <span>Dashboard</span>
                </NavLink>
              </li>
            )}
          </ul>
          <NavLink
            to="/kontakt"
            className={({ isActive }) =>
              isActive ? "active button" : "button"
            }
          >
            <span>Kontakt</span>
          </NavLink>
        </div>
      </menu>
      <div className="bottom">
        <div className="copyright">
          <FaRegCopyright />
          <span>Space Venture. All rights reserved.</span>
        </div>
        <div className="socials">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a
            href="https://support.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGooglePlusG />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
