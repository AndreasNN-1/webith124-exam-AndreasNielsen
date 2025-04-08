import React from "react";
import TurePreview from "../components/TurePreview";
import Info from "../components/Info";
import NewsLetter from "../components/NewsLetter";
import Banner from "../components/banner";
import Team from "../components/Team";

const Home = () => {
  return (
    <section id="Home">
      <Banner silder={true} />
      <TurePreview />
      <Info title="Lidt om os" img="om-os.jpg" api="about" links={{ link: "kontakt", name: "Kontakt os" }} />
      <Team />
      <NewsLetter />
    </section>
  );
};

export default Home;
