import React from "react";

export default function Welcome({ next }) {
  return (
    <>
      <div className="bigContainerTitle">
        <h2>Are you eligible to vote in this primary?</h2>
      </div>
      <div className="content">
        <h2>Please note that to be eligible to vote in this primary:</h2>
        <div className="eligibility">
          <ul className="list1">
            <li>You must be registered to vote in Oregon,</li>
            <li>Your voter registration must be active, and</li>
            <li>
              You must <b>either</b> be:
              <ul className="list2">
                <li>A registered member of the Independent Party of Oregon, or</li>
                <li>
                  A non-affliliated voter not registered with <b>any</b> political party.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="closing">
          <p>
            If you meet all the eligibility criteria, please complete this registration process to receive your
            electronic ballot via email.
          </p>
          <p>You may cast your ballot anytime between:</p>
          <p>
            <b>
              8&nbsp;AM&nbsp;April&nbsp;28<sup>th</sup> until 8&nbsp;PM&nbsp;May&nbsp;12<sup>th</sup>
            </b>
          </p>
          <button type="button" onClick={() => next()}>
            I certify that I am eligible to vote in this election
          </button>
        </div>
      </div>
    </>
  );
}
