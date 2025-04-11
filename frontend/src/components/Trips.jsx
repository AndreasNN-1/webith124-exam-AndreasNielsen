import { useEffect } from "react";
import useRequstData from "../hooks/useRequstData";
import "./Trips.scss";
import CountdownTimer from "./CountdownTimer";
import Loader from "./Loader";
import Error from "./Error";
import { NavLink } from "react-router-dom";
import DOMPurify from 'dompurify';

const Trips = () => {
    const APIURL = import.meta.env.VITE_APP_API;
    const APISTORAGE = import.meta.env.VITE_APP_API_STORAGE;

    const { makeRequest: makeRequest, isLoading: isLoading, data: data, error: error } = useRequstData();


    // no comment here. 
    useEffect(() => {
        makeRequest(`${APIURL}tours`, "GET");
    }, []);

    return (
        <section id="Trips">
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
                        <NavLink to={`/ture/${item._id}`}>Se mere</NavLink>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Trips;
