import React from "react";
import Banner from "../components/banner";
import Trips from "../components/Trips";

const Ture = () => {
  return (
    <article id="Ture">
      <Banner custom={{ img: "banner-ture.jpg", text: "Ture" }} />
      <Trips />
    </article>
  );
};

export default Ture;
