import React from "react";

export default function Welcome({ next }) {
  return (
    <div>
      <h2>Welcome</h2>
      <p>If you a registered voter in Oregon and either:</p>
      <ul>
        <li>a member of the Independent Party of Oregon</li>
        <li>a non-affiliated voter</li>
      </ul>
      <p>Please complete this short process to receive an electronic ballot for our primary!</p>
      <p>
        <b>You may cast your ballot anytime between APRIL 28 - MAY 11</b>
      </p>
      <button type="button" onClick={() => next()}>
        Continue
      </button>
    </div>
  );
}
