
import React, { useContext, useEffect } from "react";
import useRequstData from "../hooks/useRequstData";
import "./NewsLetterAdmin.scss";
import Loader from "./Loader";
import Error from "./Error";
import { NotificationContext } from "../context/NotificationContext";

const NewsLetterAdmin = () => {
    const { RunNotification, RunConfirmation } = useContext(NotificationContext);

    const APIURL = import.meta.env.VITE_APP_API;

    const { makeRequest, isLoading, data, error } = useRequstData();
    const { makeRequest: makeRequestDELETE, isLoading: isLoadingDELETE, data: dataDELETE, error: errorDELETE } = useRequstData();

    useEffect(() => {
        makeRequest(`${APIURL}newssubscription/admin`, "GET");
    }, [dataDELETE]);


    // say ok to remove email from api
    const Afmeld = async (e, id) => {
        e.preventDefault();

        // yes or no
        const YesToAfmeld = await RunConfirmation(
            "slet",
            "Er du sikker på at du vil slette denne e-mail?"
        );

        if (YesToAfmeld) {
            makeRequestDELETE(`${APIURL}newssubscription/admin/${id}`, "DELETE");
        }
    };

    // response from DELETE
    useEffect(() => {
        if (dataDELETE) {
            RunNotification(
                200,
                "slettet!",
                "E-mailen er nu slettet fra nyhedsbrevet!"
            );
        }
        if (errorDELETE) {
            RunNotification(
                400,
                "Opstod en fejl",
                "der opstod en fejl fra serveren I forsøget at slette mailen"
            );
        }
    }, [dataDELETE, errorDELETE]);

    return (
        <section id="NewsLetterAdmin">
            <h3>Alle news subscriptions</h3>
            {isLoading && <Loader />}
            {error && <Error />}
            {data && data.map((item, index) => (
                <div key={index} className="news-item">
                    {item.email}
                    <button onClick={(e) => Afmeld(e, item._id)} disabled={isLoadingDELETE}>SLET</button>
                </div>
            ))}
        </section>
    );
};

export default NewsLetterAdmin;