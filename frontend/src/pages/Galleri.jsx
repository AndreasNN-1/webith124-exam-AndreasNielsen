import React from "react";
import Gallery from "../components/Gallery";
import LocalGallery from "../components/LocalGallery";
import "./Galleri.scss"

const Galleri = () => {
  return (
    <article id="Galleri">
      <Gallery />
      <LocalGallery />
    </article>
  );
};

export default Galleri;
