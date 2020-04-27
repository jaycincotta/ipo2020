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
        <p>
          This ballot contains a non-binding presidential preference poll. It also contains binding elections for
          statewide offices, which will determine ballot access and elect the Independent Party nominees:
        </p>
        <ul className="list3">
          <li>Secretary of State Election</li>
          <li>State Treasurer Election</li>
        </ul>
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
          I'm done
        </button>
      </div>
    </>
  );
}
