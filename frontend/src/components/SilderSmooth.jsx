import { useState, useEffect, useRef } from "react";
import "./SilderSmooth.scss";
import useRequstData from "../hooks/useRequstData";
import Loader from "./Loader";
import Error from "./Error";

const SilderSmooth = () => {
  const APIURL = import.meta.env.VITE_APP_API;
  const APISTORAGE = import.meta.env.VITE_APP_API_STORAGE;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animeOut, setAnimeOut] = useState(null);
  const Timer = useRef(null);

  const { makeRequest, isLoading, data, error } = useRequstData();

  useEffect(() => {
    makeRequest(`${APIURL}banner`, "GET");
  }, []);

  

  // auto next
  const NextSilde = () => {
    if (data) {
      // idk why but the ANimeOut is not working here plz fix
      ANimeOut();
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }
  };

    // set ANimeOut class on currentIndex before updaying
  const ANimeOut = () => {
    setAnimeOut(currentIndex);
  };


  useEffect(() => {

    // set Interval
    Timer.current = setInterval(NextSilde, 10000);

    // remove Interval
    return () => {
      clearInterval(Timer.current);
    };
  }, [data]);



  const handleSliderEvent = (index) => {

    ANimeOut(); // works here tho... idk bro
    setCurrentIndex(index);

    // reset timer
    clearInterval(Timer.current);
    Timer.current = setInterval(NextSilde, 10000);
  };

  return (
    <div id="SilderSmooth">
      <div className="silder-container">
        {isLoading && <Loader />}
        {error && <Error />}
        {data &&
          data.map((slide, index) => (
            <div
              key={index}
              className={`slide ${currentIndex === index ? "active" : ""}`}
              style={{ transform: `translateY(-${currentIndex * 100}%)` }}
            >
              <div className="texts">
                <h2>{slide.content}</h2>
                <h1>{slide.title}</h1>
              </div>
              <img
                src={`${APISTORAGE}banner/${slide.image}`}
                className="img"
                alt={`slide-${index}`}
              />
            </div>
          ))}
        {data && (
          <div className="dots-con">
            {data.map((_, index) => (
              <div
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""} ${
                  animeOut === index ? "animeout" : ""
                }`}
                onClick={() => handleSliderEvent(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SilderSmooth;
