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
              className={`slide ${currentIndex == index ? "active" : ""}`}
              style={{ transform: `translateY(-${currentIndex * 100}%)` }}
            >
              <div className="texts">
                <p>{slide.content}</p>
                <h2>{slide.title}</h2>
              </div>
              <img
                src={`${APISTORAGE}banner/${slide.image}`}
                className="img"
                alt={`slide-${index}`}
              />
            </div>
          ))
        }
        {Array.isArray(data) && (
          <div className="dots-con">
            {data.map((_, index) => (
              <div
                key={index}
                className={`dot ${currentIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SilderSmooth;
