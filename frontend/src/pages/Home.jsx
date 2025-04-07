import React from "react";
import DataPages from "../components/DataPages";
import SilderSmooth from "../components/silderSmooth";
import SilderStitke from "../components/silderStitke";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <>
      <div>
        <DataPages />
        <SilderSmooth />
        <SilderStitke />
        <NewsLetter />
      </div>
    </>
  );
};

export default Home;
