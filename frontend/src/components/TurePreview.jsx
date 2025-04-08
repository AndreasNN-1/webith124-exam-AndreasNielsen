import React, { useEffect } from "react";
import "./TurePreview.scss";
import useRequstData from "../hooks/useRequstData";
import Loader from "./Loader";
import Error from "./Error";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const TurePreview = () => {
    const APIURL = import.meta.env.VITE_APP_API;
    const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
    const { makeRequest, isLoading, data, error } = useRequstData();
    useEffect(() => {
        makeRequest(`${APIURL}tours`, "GET");
    }, []);
    return (
        <div id="TurePreview">
            <div className="Tures">
                {isLoading && <Loader />}
                {error && <Error />}
                {data && data.map((item, index) => (
                    <NavLink to={`/ture/${item._id}`} key={index} className="item">
                        <div className="texts">
                            <p>{item.destination}</p>
                        </div>
                        <img
                            src={`${APPSTORAGE}${item.destination === "Mars" ? "mars" : "moon"}-btn.jpg`}
                            className="img"
                            alt={`item-${item.image1}`}
                        />
                    </NavLink>
                ))
                }
            </div>
            <NavLink to="/ture" >Vores ture<FaLongArrowAltRight /></NavLink>
        </div>
    );
};

export default TurePreview;
