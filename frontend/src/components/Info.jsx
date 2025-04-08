import { useEffect } from "react";
import useRequstData from "../hooks/useRequstData";
import "./Info.scss";
import Loader from "./Loader";
import Error from "./Error";
import { NavLink } from "react-router-dom";

const Info = ({ title, img, api, links }) => {
    const APIURL = import.meta.env.VITE_APP_API;
    const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
    const {
        makeRequest: makeRequestOm,
        isLoading: isLoadingOm,
        data: dataOm,
        error: errorOm,
    } = useRequstData();

    useEffect(() => {
        makeRequestOm(`${APIURL}${api}`, "GET");
    }, []);


    return (
        <div id="Info">
            <div className="OmOs">
                <div className="Info-img-con">
                    <img src={`${APPSTORAGE}${img}`} alt="om-os" />
                </div>
                {isLoadingOm && <Loader />}
                {errorOm && <Error />}
                {dataOm && (
                    <div className="content">
                        <h3>{title}</h3>
                        <div className="title-con">
                            <div className="title">
                                <p>{dataOm.title}</p>
                            </div>
                        </div>
                        <div className="text" dangerouslySetInnerHTML={{ __html: dataOm.content }} />
                        {links && <NavLink to={`/${links.link}`}>{links.name}</NavLink>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Info;
