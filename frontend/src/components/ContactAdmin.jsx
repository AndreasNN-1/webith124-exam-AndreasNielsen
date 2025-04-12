
import React, { useContext, useEffect } from "react";
import useRequstData from "../hooks/useRequstData";
import "./ContactAdmin.scss";
import Loader from "./Loader";
import Error from "./Error";
import { NotificationContext } from "../context/NotificationContext";

const ContactAdmin = () => {
    const { RunNotification, RunConfirmation } = useContext(NotificationContext);

    const APIURL = import.meta.env.VITE_APP_API;

    const { makeRequest, isLoading, data, error } = useRequstData();
    const { makeRequest: makeRequestDELETE, isLoading: isLoadingDELETE, data: dataDELETE, error: errorDELETE } = useRequstData();
    const { makeRequest: makeRequestPATCH, isLoading: isLoadingPATCH, data: dataPATCH, error: errorPATCH } = useRequstData();

    useEffect(() => {
        makeRequest(`${APIURL}contact/admin`, "GET");
    }, [dataDELETE, dataPATCH]);



    // slet start
    // say ok to remove contact from api
    const slet = async (e, id) => {
        e.preventDefault();

        // yes or no
        const YesToAfmeld = await RunConfirmation(
            "slet",
            "Er du sikker på at du vil slette denne contact?"
        );

        if (YesToAfmeld) {
            makeRequestDELETE(`${APIURL}contact/admin/${id}`, "DELETE");
        }
    };

    // response from DELETE
    useEffect(() => {
        if (dataDELETE) {
            RunNotification(
                200,
                "slettet!",
                "contacten er nu slettet fra contact!"
            );
        }
        if (errorDELETE) {
            RunNotification(
                400,
                "Opstod en fejl",
                "der opstod en fejl fra serveren I forsøget at slette contact"
            );
        }
    }, [dataDELETE, errorDELETE]);


    // slet end



    // rat start
    const rat = async (e, id, read) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("read", read)
        // send
        makeRequestPATCH(`${APIURL}contact/admin/${id}`, "PATCH", formData);
    };

    // response from PATCH
    useEffect(() => {
        if (dataPATCH) {
            RunNotification(
                200,
                "opdateret!",
                `${dataPATCH.message} til: ${dataPATCH.rettet}`
            );
        }
        if (errorPATCH) {
            RunNotification(
                400,
                "Opstod en fejl",
                "der opstod en fejl fra serveren I forsøget at redigere contacten"
            );
        }
    }, [dataPATCH, errorPATCH]);

    // rat end

    return (
        <section id="ContactAdmin">
            <h3>Alle Contacts</h3>
            {isLoading && <Loader />}
            {error && <Error />}
            <div className="containers">
                <h4>alle ikke læst</h4>
                {data && data.filter((item) => item.read === false).length > 0 ?
                    data
                        .filter((item) => item.read === false)
                        .sort((a, b) => { return new Date(a.spacelaunch) - new Date(b.spacelaunch) })
                        .map((item, index) => (
                            <div key={index} className="contact-item">
                                <div className="opstions">
                                    <button onClick={(e) => rat(e, item._id, true)} disabled={isLoadingDELETE || isLoadingPATCH}>Mærk som læst</button>
                                    <button className="slet" onClick={(e) => slet(e, item._id)} disabled={isLoadingDELETE || isLoadingPATCH}>SLET</button>
                                </div>

                                <div className="item-content">
                                    <p>{item.received.slice(0, 10)} - {item.received.slice(11, 16)}</p>

                                    <div className="info">
                                        <h5>info</h5>
                                        <p>Email: {item.email}</p>
                                        <p>Tlf: {item.phone}</p>
                                        <p>Navn: {item.name}</p>

                                    </div>
                                    <div className="info">
                                        <h5>message</h5>
                                        <p className="message">{item.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    :
                    <p className="error-p">ingen nye beskeder</p>
                }
            </div >
            <div className="containers">
                <h4>alle læst</h4>
                {data && data.filter((item) => item.read === true).length > 0 ?
                    data.filter((item) => item.read == true)
                        .sort((a, b) => { return new Date(a.spacelaunch) - new Date(b.spacelaunch) })
                        .map((item, index) => (
                            <div key={index} className="contact-item">
                                <div className="opstions">
                                    <button onClick={(e) => rat(e, item._id, false)} disabled={isLoadingDELETE || isLoadingPATCH}>Mærk som ikke læst</button>
                                    <button className="slet" onClick={(e) => slet(e, item._id)} disabled={isLoadingDELETE || isLoadingPATCH}>SLET</button>
                                </div>
                                <div className="item-content">
                                    <p>{item.received.slice(0, 10)} - {item.received.slice(11, 16)}</p>

                                    <div className="info">
                                        <h5>info</h5>
                                        <p>Email: {item.email}</p>
                                        <p>Tlf: {item.phone}</p>
                                        <p>Navn: {item.name}</p>

                                    </div>
                                    <div className="info">
                                        <h5>message</h5>
                                        <p className="message">{item.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    :
                    <p className="error-p">ingen Læst beskeder</p>
                }
            </div>
        </section>
    );
};

export default ContactAdmin;