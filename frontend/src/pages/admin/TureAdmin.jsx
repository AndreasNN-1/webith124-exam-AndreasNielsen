import React, { useEffect } from "react";
import "./TureAdmin.scss";
import Banner from "../../components/Banner";
import useRequstData from "../../hooks/useRequstData";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import DOMPurify from 'dompurify';
import CountdownTimer from "../../components/CountdownTimer";
import { NavLink } from "react-router-dom";

const TureAdmin = () => {
    const APIURL = import.meta.env.VITE_APP_API;
    const APISTORAGE = import.meta.env.VITE_APP_API_STORAGE;
    const {
        makeRequest: makeRequest,
        isLoading: isLoading,
        data: data,
        error: error,
    } = useRequstData();

    useEffect(() => {
        makeRequest(`${APIURL}tours`, "GET");
    }, []);
    return (
        <section id="TureAdmin">
            <Banner custom={{ img: "TureAdminBanner.jpg", text: "Alle ture" }} />
            <NavLink to="/admin/ture/upload" className="btn">Upload ny ture</NavLink>
            {isLoading && <Loader />}
            {error && <Error />}
            {data && data.sort((a, b)=> {return new Date(a.spacelaunch) - new Date(b.spacelaunch)}).map((item, index) => (
                <div key={index} className="Trips-item">
                    <div className="price">
                        {item.price}
                    </div>
                    <figure className="image">
                        <img src={`${APISTORAGE}tours/${item.image1}`} alt={item.destination} />
                    </figure>
                    <div className="info">
                        <p className="title">{item.title}</p>
                        <div className="content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} />
                        <CountdownTimer launchDate={item.spacelaunch} />
                        <NavLink to={`/admin/ture/${item._id}`}>Redigere</NavLink>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default TureAdmin;
