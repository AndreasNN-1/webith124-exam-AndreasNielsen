import React from "react";
import Gallery from "../components/Gallery";
import LocalGallery from "../components/LocalGallery";
import Banner from "../components/Banner";
import "./Galleri.scss"

const Galleri = () => {
  return (
    <article id="Galleri">
      <Banner custom={{ img: "GalleriBanner.jpg", text: "Galleri" }} />
      <div className="Galleri-con">
        <Gallery addtitle={false} />
        <LocalGallery />
      </div>
    </article>
  );
};

export default Galleri;
