import React from "react";
import Banner from "../components/Banner";
import Info from "../components/Info";
import Gallery from "../components/Gallery";

const Rumfærgen = () => {
  return (
    <article id="Rumfærgen">
      <Banner custom={{ img: "banner-spaceship.jpg", text: "Rumfærgen" }} />
      <Info api="spacecraft" />
      <Gallery addtitle={true} />
    </article>
  );
};

export default Rumfærgen;
