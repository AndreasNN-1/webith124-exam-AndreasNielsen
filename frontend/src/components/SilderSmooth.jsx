import { useState, useEffect } from "react";
import "./SilderSmooth.scss";
import useRequstData from "../hooks/useRequstData";
import Loader from "./Loader";
import Error from "./Error";

const SilderSmooth = () => {
  const APIURL = import.meta.env.VITE_APP_API;
  const APISTORAGE = import.meta.env.VITE_APP_API_STORAGE;
  const { makeRequest, isLoading, data, error } = useRequstData();
  useEffect(() => {
    makeRequest(`${APIURL}banner`, "GET");
  }, []);


  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div id="SilderSmooth">
      <div className="silder-container">
        {isLoading && <Loader />}
        {error && <Error />}
        {data &&
          data.map((slide, index) => (
            <div
              key={index}
              className="slide"
              style={{ transform: `translateY(-${currentIndex * 100}%)` }}
            >
              <div className="texts">
              <h2>{slide.title}</h2>
              <p>{slide.content}</p>
              </div>
              <img
                src={`${APISTORAGE}banner/${slide.image}`}
                className="img"
                alt={`slide-${index}`}
              />
            </div>
          ))}
      </div>
      <div>
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? data.length - 1 : prevIndex - 1
            )
          }
        >
          Prev
        </button>

        <button
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SilderSmooth;
