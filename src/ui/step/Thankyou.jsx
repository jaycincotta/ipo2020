import React from "react";

export default function Thankyou({ next, done, formData }) {
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
            CONFIDENTIAL: IPO Primary Ballot for {formData.firstName}&nbsp;{formData.lastName}
          </b>
        </p>
        <p>
          Click the ballot link in that email and cast your vote by{" "}
          <b>
            8&nbsp;PM&nbsp;on&nbsp;Tuesday,&nbsp;May&nbsp;12<sup>th</sup>
          </b>
        </p>
        <button type="button" onClick={() => next()}>
          Start again with a new voter
        </button>
        <button type="button" onClick={() => done()}>
          Complete Registration
        </button>
      </div>
    </>
  );
}
