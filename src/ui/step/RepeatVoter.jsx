import React from "react";

export default function RepeatVoter({ next, restart, formData }) {
  return (
    <>
      <div className="bigContainerTitle">
        <h2>Welcome Back!</h2>
      </div>
      <div className="content">
        <p>Hi, {formData.firstName},</p>
        <p>
          You have already been sent your ballot at <b>{formData.email}</b>.
        </p>
        <p>We can resend you your ballot, but if you've already cast your vote, that's final and may not be revised.</p>
        <h2>What if I can't access the email address I initially registered with?</h2>
        <p>
          If you can't access your ballot at <b>{formData.email}</b>, you may re-register using a different email
          address, but only the first ballot you cast will count in the election results.
        </p>
        <p>
          In addition, our voter fraud detection system triggers an extra review whenever it detects multiple ballots
          cast for the same voter.
        </p>
        <button type="button" onClick={() => next()}>
          Resend my ballot
        </button>
        <button type="button" onClick={() => restart()}>
          Repeat Registration
        </button>
      </div>
    </>
  );
}
