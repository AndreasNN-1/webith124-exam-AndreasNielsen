import React, { useRef } from "react";
import "./Confirmation.scss";

const Confirmation = ({ ConfirmationData, ConfirmationOutput }) => {
  const confirmationRef = useRef(null);

  const handleBackgroundClick = (e) => {
    if (!confirmationRef.current?.contains(e.target)) {
      ConfirmationOutput("Canceled");
    }
  };

  return (
    <div className="Confirmation-container" onClick={handleBackgroundClick}>
      <div className="Confirmation" ref={confirmationRef}>
        <div className="texts">
          <h4>{ConfirmationData.title}</h4>
          <p>{ConfirmationData.text}</p>
        </div>
        <div className="actions">
          <button onClick={() => ConfirmationOutput("Confirmed")}>ja</button>
          <button onClick={() => ConfirmationOutput("Canceled")}>nej</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
