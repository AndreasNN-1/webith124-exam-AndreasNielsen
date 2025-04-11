import React, { useRef } from "react";
import "./Confirmation.scss";

const Confirmation = ({ ConfirmationData, ConfirmationOutput }) => {
  const confirmationRef = useRef(null);


  // check if Confirmation-container is clicked = Canceled
  const handleBackgroundClick = (e) => {
    if (!confirmationRef.current?.contains(e.target)) {
      ConfirmationOutput(false);
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
          <button onClick={() => ConfirmationOutput(true)}>ja</button>
          <button onClick={() => ConfirmationOutput(false)}>nej</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
