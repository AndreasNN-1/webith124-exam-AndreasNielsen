import React from "react";
import Banner from "../components/banner";
import Info from "../components/Info";
import Gallery from "../components/Gallery";

const Rumfærgen = () => {
  return (
    <article id="Rumfærgen">
      <Banner custom={{ img: "banner-spaceship.jpg", text: "Rumfærgen" }} />
      <Info title="Hvorfor vælge os" img="om-os.jpg" api="spacecraft" />
      <Gallery />
    </article>
  );
};

export default Rumfærgen;
