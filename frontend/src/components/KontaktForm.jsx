import { useContext, useEffect, useState } from "react";
import useRequstData from "../hooks/useRequstData";
import "./KontaktForm.scss";
import { NotificationContext } from "../context/NotificationContext";
import { FaCcDiscover } from "react-icons/fa";

const KontaktForm = () => {
    const { RunNotification } = useContext(NotificationContext);
    const APIURL = import.meta.env.VITE_APP_API;
    const [send, setSend] = useState(false);
    const msgSend = sessionStorage.getItem("msgSend");
    const {
        makeRequest: makeRequest,
        isLoading: isLoading,
        data: data,
        error: error,
    } = useRequstData();
    const [fromData, setFromData] = useState({
        name: "",
        email: "",
        tlf: "",
        msg: "",
    })
    const [fromError, setFromError] = useState({
        name: false,
        email: false,
        tlf: false,
        msg: false,
    })

    useEffect(() => {
        if (msgSend) {
            setSend(msgSend);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleError = (name) => {
        setFromError(prev => ({
            ...prev,
            [name]: true,
        }));
    };

    const Submit = (e) => {
        e.preventDefault();
        const trimmedName = fromData.name.trim();
        const trimmedEmail = fromData.email.trim();
        const trimmedTlf = fromData.tlf.trim();
        const trimmedMsg = fromData.msg.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setFromError({
            name: false,
            email: false,
            tlf: false,
            msg: false,
        });

        if (trimmedName === "") {
            handleError("name");
            return;
        }
        if (!emailRegex.test(trimmedEmail) || trimmedEmail === "") {
            handleError("email");
            return;
        }
        if (trimmedTlf === "") {
            handleError("tlf");
            return;
        }
        if (trimmedMsg === "") {
            handleError("msg");
            return;
        }

        const SendData = {
            name: fromData.name,
            email: fromData.email,
            phone: fromData.tlf,
            message: fromData.msg,
        };

        makeRequest(`${APIURL}contact`, "POST", SendData);
    };

    useEffect(() => {
        if (error) {
            RunNotification(400, "Beskedet fejl", "Vi kendte desværre ikke sende din besked men hvis du bliver ved med at opleve problemer men mest kontakte vores support");
        }
        if (data) {
            setFromData({
                name: "",
                email: "",
                tlf: "",
                msg: "",
            })
            setSend(true);
            sessionStorage.setItem("msgSend", true);
            RunNotification(200, "Send!", "Dit besked er nu hernede sendt");
        }
    }, [error, data]);

    return (
        <div id="KontaktForm">
            <div className="title">
                <h4>Kontakt</h4>
                <p>Skulle du side et spørgsmål eller to, så skriv til os og vi vil kontakte dig hurtigst muligt.</p>
            </div>
            {send ? (
                <div className="send">
                    <h5>Din besked er sendt</h5>
                    <p>Tusind tak for din besked <br /> Det betyder meget at det tager kontakt til os.</p>
                </div>
            ) : (
                <form className="Kontakt-Form" onSubmit={Submit}>
                    <label htmlFor="name" className={fromError.name ? "error" : ""}>
                        <input
                            disabled={isLoading}
                            required
                            type="text"
                            name="name"
                            pattern="[A-Za-z\s]+"
                            title="Indtast kun bogstaver (A–Z)"
                            placeholder="Dit navn"
                            value={fromData.name}
                            onChange={handleChange}
                            minLength={4}
                            maxLength={25}
                        />
                        {fromError.name && <span>Indtast dit navn</span>}
                    </label>
                    <label htmlFor="email" className={fromError.email ? "error" : ""}>
                        <input
                            disabled={isLoading}
                            required
                            type="email"
                            name="email"
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            title="Indsæt gyldig e-mail"
                            placeholder="E-mail"
                            value={fromData.email}
                            onChange={handleChange}
                            minLength={6}
                            maxLength={100}
                        />
                        {fromError.email && <span>Indtast gyldig e-mail</span>}
                    </label>
                    <label htmlFor="tlf" className={fromError.tlf ? "error" : ""}>
                        <input
                            disabled={isLoading}
                            required
                            type="tel"
                            name="tlf"
                            pattern="[0-9]+"
                            title="Indsæt telefonnummer - kun tal"
                            placeholder="Tlf"
                            value={fromData.tlf}
                            onChange={handleChange}
                            minLength={8}
                            maxLength={11}
                        />
                        {fromError.tlf && <span>Indtast gyldig telefonnummer</span>}
                    </label>
                    <label htmlFor="msg" className={fromError.msg ? "error" : ""}>
                        <textarea
                            disabled={isLoading}
                            required
                            name="msg"
                            placeholder="Besked"
                            title="Skriv en besked"
                            onChange={handleChange}
                            value={fromData.msg}
                            minLength={5}
                            maxLength={500}
                        />
                        {fromError.msg && <span>Indtast en besked</span>}
                    </label>
                    <button disabled={isLoading} type="submit">Send</button>
                </form>
            )}
        </div>
    );
};

export default KontaktForm;
