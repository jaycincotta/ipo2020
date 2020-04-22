import React from "react";

export default function Thankyou({ next, formData }) {
  return (
    <>
      <div className="bigContainerTitle">
        <h2>Thank You, {formData.firstName}!</h2>
      </div>
      <div className="content">
        <p>
          We have sent your ballot to <b>{formData.email}</b>
        </p>
        <p>Check your inbox for an email from STAR Elections with the subject line:</p>
        <p>
          <b>
            CONFIDENTIAL: IPO Primary Ballot for {formData.firstName} {formData.lastName}
          </b>
        </p>
        <p>
          Click the ballot link in that email and cast your vote by <b>8 PM on Tuesday, May 12th</b>
        </p>
        <button type="button" onClick={() => next()}>
          Start again with another voter
        </button>
      </div>
    </>
  );
}
