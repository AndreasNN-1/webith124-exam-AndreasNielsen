import { useState, useEffect, useRef } from "react";
import "./SilderSmooth.scss";
import useRequstData from "../hooks/useRequstData";
import Loader from "./Loader";
import Error from "./Error";

const SilderSmooth = () => {
  const APIURL = import.meta.env.VITE_APP_API;
  const APISTORAGE = import.meta.env.VITE_APP_API_STORAGE;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { makeRequest, isLoading, data, error } = useRequstData();
  const Timer = useRef(null);

  useEffect(() => {
    makeRequest(`${APIURL}banner`, "GET");
  }, []);

  const NextSilde = () => {
    if (data) {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }
  };

  useEffect(() => {
    Timer.current = setInterval(NextSilde, 10000);

    return () => {
      clearInterval(Timer.current);
    };
  }, [data]);


  const handleSliderEvent = (index) => {
    setCurrentIndex(index);
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
        {Array.isArray(data) && (
          <div className="dots-con">
            {data.map((_, index) => (
              <div
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
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
