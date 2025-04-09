import React from "react";
import KontaktForm from "../components/KontaktForm";

const Kontakt = () => {
  return (
    <article id="Kontakt" style={{ textAlign: "center", padding: "20px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22944.788751731026!2d10.181543212544465!3d56.14493062240977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c4cb15397788b%3A0x8c4dd7d9912ea2af!2sAarhus!5e1!3m2!1sen!2sdk!4v1744098623364!5m2!1sen!2sdk"
        width="100%"
        height="450"
        style={{ border: "0", borderRadius: "8px", maxWidth: "1000px", maxHeight: "100vw" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
      </iframe>
      <KontaktForm />
    </article>
  );
};

export default Kontakt;
