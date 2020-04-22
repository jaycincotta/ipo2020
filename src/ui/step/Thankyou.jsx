import React from "react";

export default function Thankyou({ next }) {
  return (
    <>
      <div className="bigContainerTitle">
        <h2>Thank You!</h2>
      </div>
      <div className="content">
        <p>We have sent your ballot to the email address you provided.</p>
        <button type="button" onClick={() => next()}>
          Start again with another voter
        </button>
      </div>
    </>
  );
}
