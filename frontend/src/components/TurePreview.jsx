import React from "react";
import "./TurePreview.scss";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const TurePreview = () => {
  const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;

  // nice 
  
  return (
    <section id="TurePreview">
      <div className="Tures">
        <NavLink to="/ture/617f80a6066b123e4c7c941a" className="item">
          <div className="texts">
            <p>Mars</p>
          </div>
          <img src={`${APPSTORAGE}mars-btn.jpg`} className="img" alt="Mars" />
        </NavLink>
        <NavLink to="/ture/617f8116066b123e4c7c941c" className="item">
          <div className="texts">
            <p>Månen</p>
          </div>
          <img src={`${APPSTORAGE}moon-btn.jpg`} className="img" alt="Månen" />
        </NavLink>
      </div>
      <NavLink to="/ture">
        Vores ture
        <FaLongArrowAltRight />
      </NavLink>
    </section>
  );
};

export default TurePreview;
