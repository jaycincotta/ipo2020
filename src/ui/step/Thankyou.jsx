import React from "react";

export default function Thankyou({ next }) {
  return (
    <div>
      <h2>Thank You!</h2>
      <p>We have sent your ballot to the email address you provided.</p>
      <button type="button" onClick={() => next()}>
        One more thing...
      </button>
    </div>
  );
}
