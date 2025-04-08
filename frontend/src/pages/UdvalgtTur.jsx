import React, { useEffect } from "react";
import useRequstData from "../hooks/useRequstData";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useParams } from "react-router-dom";
import "./UdvalgtTur.scss";
import { MdOutlineStar, MdOutlineStarHalf, MdOutlineStarBorder } from "react-icons/md";
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaTwitter } from "react-icons/fa";

const UdvalgtTur = () => {
  const { id } = useParams();
  const APIURL = import.meta.env.VITE_APP_API;
  const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
  const { makeRequest, isLoading, data, error } = useRequstData();
  useEffect(() => {
    makeRequest(`${APIURL}tours/${id}`, "GET");
  }, []);

  return (
    <>
      <div id="UdvalgtTur">
        {isLoading && <Loader />}
        {error && <Error />}
        {data && (
          <div className="ship">
            <div className="trip-images">
              <img src={`${APPSTORAGE}${data.image1}`} alt="" />
              <img src={`${APPSTORAGE}${data.image2}`} alt="" />
            </div>
            <div className="trip-info">
              <div className="price">
                {data.price}
              </div>
              <h6>{data.destination}</h6>
              <div className="rating">
                {[...Array(5)].map((_, index) =>
                  index < data.rating ? (
                    <MdOutlineStar key={index} />
                  ) : (
                    <MdOutlineStarBorder key={index} />
                  )
                )}
              </div>
              <div className="description">
                <p className="title">{data.title}</p>
                <div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
              </div>
              <div className="details">
                <p>
                  Dato: <span>{new Date(data.spacelaunch).toLocaleString('da-DK', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}</span>
                </p>
                <p>Destination: <span>{data.destination}</span></p>
                <p>Pris: <span>{data.price}</span></p>
                <p>Afstand fra jorden: <span>{data.distance}</span></p>
                <p>Flyvetid: <span>{data.traveltime}</span></p>
              </div>
              <div className="share">
                <p>SHARE</p>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://support.google.com/" target="_blank" rel="noopener noreferrer">
                  <FaGooglePlusG />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UdvalgtTur;
