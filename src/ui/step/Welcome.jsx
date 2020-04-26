import React from "react";
import Eligibility from "../Eligibility";

export default function Welcome({ next }) {
  return (
    <>
      <div className="bigContainerTitle">
        <h2>Are you eligible to vote in this primary?</h2>
      </div>
      <div className="content">
        <Eligibility />
        <div className="closing">
          <p>
            If you met all the eligibility criteria as of March 1<sup>st</sup>, 2020, please complete this registration
            process to receive your electronic ballot via email.
          </p>
          <p>You may cast your ballot anytime between:</p>
          <p>
            <b>
              8&nbsp;AM&nbsp;April&nbsp;28<sup>th</sup> until 8&nbsp;PM&nbsp;May&nbsp;12<sup>th</sup>
            </b>
          </p>
          <button type="button" onClick={() => next()}>
            Yes, I am eligible to vote in this election
          </button>
        </div>
      </div>
    </>
  );
}
