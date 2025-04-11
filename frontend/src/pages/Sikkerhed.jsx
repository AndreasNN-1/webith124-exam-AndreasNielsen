import React from "react";
import Safety from "../components/Safety";
import Info from "../components/Info";
import Banner from "../components/Banner";

const Sikkerhed = () => {
  return (
    <article id="Sikkerhed">
      <Banner custom={{ img: "safetyBanner.jpg", text: "Sikkerhed" }} />
      <Info title="om vores sikkerhed" img="safty.jpg" api="safety" local={true} />
    </article>
  );
};

export default Sikkerhed;
