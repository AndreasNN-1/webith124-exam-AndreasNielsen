import React, { useContext, useEffect, useState } from "react";
import "./NewsLetter.scss";
import { NotificationContext } from "../context/NotificationContext";
import useRequstData from "../hooks/useRequstData";
import Error from "./Error";

const NewsLetter = () => {
  const { RunNotification, RunConfirmation } = useContext(NotificationContext);

  const APIURL = import.meta.env.VITE_APP_API;
  const joined = localStorage.getItem("NewsLetter");

  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);

  const { makeRequest, isLoading, data, error } = useRequstData();
  const { makeRequest: makeRequestAfmeld, isLoading: isLoadingAfmeld, data: dataAfmeld, error: errorAfmeld } = useRequstData();


  // POST - handle submit
  const Submit = (e) => {
    e.preventDefault();

    // reset error
    setShowError(false);

    // remove dubble spaces
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail) || trimmedEmail === "") {
      setShowError(true); return;
    }


    const requestBody = { email: trimmedEmail };
    makeRequest(`${APIURL}newssubscription`, "POST", requestBody);
  };




  // say ok to remove email from api
  const Afmeld = async (e) => {
    e.preventDefault();

    // im good at naming :)
    const YesToAfmeld = await RunConfirmation(
      "Afmeld",
      "Er du sikker på du vil afmelde vores nyhedsbrev?"
    );

    if (YesToAfmeld) {
      UnSubmit();
    }
  };


  // DELETE email from api
  const UnSubmit = () => {

    // remove dubble spaces
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail) || trimmedEmail === "") {
      setShowError(true);
      return;
    }

    setShowError(false);

    makeRequestAfmeld(`${APIURL}newssubscription/afmeld/${trimmedEmail}`, "DELETE");
  };


  // response from POST
  useEffect(() => {
    if (data) {
      localStorage.setItem("NewsLetter", true);
      RunNotification(
        200,
        "Tilmeldt!",
        "Tak for at have dig tilmeldt dig til vores nyhedsbrev, Du ville få 25% rabat på din første tur!"
      );
      setEmail("");
    }
  }, [data]);


  // response from DELETE
  useEffect(() => {
    if (dataAfmeld) {
      localStorage.removeItem("NewsLetter");
      RunNotification(
        200,
        "Afmeldt!",
        "Du er nu blevet afmeldt for vores nyhedsbrev."
      );
      setEmail("");
    }
  }, [dataAfmeld]);




  return (
    <section id="NewsLetter">
      <img className="bg-img" src="/SiteAssets/images/newsmail-bg.jpg" alt="nyhedsbrev baggrundsbillede" />
      {joined ? (
        <div className="NewsLetter-container">
          <h4>Du har tilmeldt dig og får 25% rabat</h4>
          <p>Tak for at have dig tilmeldt dig til vores nyhedsbrev, Du ville få 25% rabat på din første tur!</p>
          <p>Vil du afmelde nyhedsbrev?</p>
          <form onSubmit={Afmeld}>
            <label htmlFor="email" className="inputs">
              {showError && <span>udfyld korrekt e-mail</span>}
              <input
                disabled={isLoadingAfmeld}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                required
                autoComplete="email"
                placeholder="Indsæt e-mailadresse"
                minLength={6}
                maxLength={100}
              />
            </label>
            <button disabled={isLoadingAfmeld} type="submit">Afmeld</button>
            {errorAfmeld && <Error />}
          </form>
        </div>
      )
        :
        (
          <div className="NewsLetter-container">
            <h4>Tilmeld dig og få 25% rabat</h4>
            <p>Tilmeld dig vores nyhedsbrev og få 25% rabat på din første tur!</p>
            <form onSubmit={Submit}>
              <label htmlFor="email" className="inputs">
                {showError && <span>udfyld korrekt e-mail</span>}
                <input
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  required
                  autoComplete="email"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  placeholder="Din E-mail"
                  minLength={6}
                  maxLength={100}
                />
              </label>
              <button disabled={isLoading} type="submit">Tilmeld</button>
            </form>
            {error && <Error />}
          </div >
        )}
    </section >
  );
};

export default NewsLetter;
