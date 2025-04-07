import React from "react";
import Banner from "../components/banner";
import Info from "../components/Info";

const Rumfærgen = () => {
  return (
    <>
      <div id="Rumfærgen">
        <Banner custom={{ img: "banner-spaceship.jpg", text: "Rumfærgen" }} />
        <Info title="Hvorfor vælge os" img="om-os.jpg" api="spacecraft" />
      </div>
    </>
  );
};

export default Rumfærgen;
