import React from "react";
import "./RumfærgenAdmin.scss";
import Banner from "../../components/Banner";
import { NavLink } from "react-router-dom";
import Info from "../../components/Info";

const RumfærgenAdmin = () => {

  return (
    <div id="RumfærgenAdmin">
      <Banner custom={{ img: "RumfærgenAdminBanner.jpg", text: "Rumfærgen" }} />
      <NavLink to="/admin/rumfærgen/edit" className="btn">Redigere i rumfærgen</NavLink>
      <Info api="spacecraft" local={false} />
    </div>
  );
};

export default RumfærgenAdmin;
