import { useEffect } from "react";
import useRequstData from "../hooks/useRequstData";
import "./Trips.scss";
import CountdownTimer from "./CountdownTimer";
import Loader from "./Loader";
import Error from "./Error";
import { NavLink } from "react-router-dom";

const Trips = () => {
    const APIURL = import.meta.env.VITE_APP_API;
    const {
        makeRequest: makeRequest,
        isLoading: isLoading,
        data: data,
        error: error,
    } = useRequstData();

    const calculateTimeLeft = () => {
        const difference = new Date(launchDate) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return timeLeft;
    };

    useEffect(() => {
        makeRequest(`${APIURL}tours`, "GET");
    }, []);
    return (
        <div id="Trips">
            {isLoading && <Loader />}
            {error && <Error />}
            {data && data.map((item, index) => (
                <div key={index} className="Trips-item">
                    <figure className="image">
                        <img src={`/SiteAssets/images/${item.image1}`} alt={item.destination} />
                    </figure>
                    <div className="info">
                        <div className="price">
                            {item.price}
                        </div>
                        <p className="title">{item.title}</p>
                        <div className="content" dangerouslySetInnerHTML={{ __html: item.content }} />
                        <CountdownTimer launchDate={item.spacelaunch} />
                        <NavLink Link to={`/ture/${item.destination}`}>Se mere</NavLink>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Trips;
