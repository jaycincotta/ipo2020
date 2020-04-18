import React from "react";

export default function Welcome({ next }) {
  return (
    <>
      <div className="bigContainerTitle">
        <h2>Welcome</h2>
      </div>
      <div className="content">
        <p>
          If you are a registered voter in Oregon and as of March 1st were either a member of the Independent Party of
          Oregon or a non-affiliated voter, you are eligible to vote in the Independent Party of Oregon's May 2020
          primary.
        </p>
        <p>Please complete the following registration process in order to receive an electronic ballot.</p>
        <p>
          <b>You may cast your ballot anytime between 8 AM April 28th and 8 PM May 12th</b>
        </p>
        <button type="button" onClick={() => next()}>
          Continue
        </button>
      </div>
    </>
  );
}
