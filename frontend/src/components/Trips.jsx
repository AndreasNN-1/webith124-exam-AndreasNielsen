import { useEffect } from "react";
import useRequstData from "../hooks/useRequstData";
import "./Trips.scss";
import CountdownTimer from "./CountdownTimer";
import Loader from "./Loader";
import Error from "./Error";
import { NavLink } from "react-router-dom";

const Trips = () => {
    const APIURL = import.meta.env.VITE_APP_API;
    const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
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
        <section id="Trips">
            {isLoading && <Loader />}
            {error && <Error />}
            {data && data.map((item, index) => (
                <div key={index} className="Trips-item">
                    <div className="price">
                        {item.price}
                    </div>
                    <figure className="image">
                        <img src={`${APPSTORAGE}${item.image1}`} alt={item.destination} />
                    </figure>
                    <div className="info">
                        <p className="title">{item.title}</p>
                        <div className="content" dangerouslySetInnerHTML={{ __html: item.content }} />
                        <CountdownTimer launchDate={item.spacelaunch} />
                        <NavLink to={`/ture/${item._id}`}>Se mere</NavLink>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Trips;
