import React from "react";

export default function RepeatVoter({ next }) {
  return (
    <>
      <div className="bigContainerTitle">
        <h2>Welcome Back!</h2>
      </div>
      <div className="content">
        <p>You have already received a ballot for this primary.</p>
        <p>
          If you want, we can resend you your ballot, but if you've already cast your vote, that's final and may not be
          revised.
        </p>
        <button type="button" onClick={() => next()}>
          I'm testing and want to repeat the signup process
        </button>
      </div>
    </>
  );
}
