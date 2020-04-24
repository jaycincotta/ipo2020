import React from "react";
import { Formik } from "formik";
import FormCheckbox from "../FormCheckbox";

export default function StartOver({ next, done }) {
  return (
    <>
      <div className="bigContainerTitle">
        <h2>Remember: One Person, One Vote</h2>
      </div>
      <div className="content">
        <p>
          The option to "<i>Start again with another voter</i>" has been provided to allow multiple users to share a
          computer, smartphone, or device if needed.
        </p>

        <p className="error">
          <b>WARNING</b>: Attempting to submit multiple ballots for the same voter, or attempting to submit a ballot in
          someone else's name is voter fraud.
        </p>

        <blockquote>
          <p>
            <b>ORS 260.715 Prohibited conduct</b>
            <br />
            <br />
            (1) A person may not knowingly make a false statement, oath or affidavit when a statement, oath or affidavit
            is required under the election laws.
            <br />
            <br />
            (2) A person may not request a ballot in a name other than the person’s own name.
            <br />
            <br />
            (3) A person may not vote or attempt to vote more than once at any election held on the same date.
            <br />
            <br />
            (4) A person may not vote or attempt to vote both in an election held in this state and in another state on
            the same date.
            <br />
            <br />
            (6) A person may not willfully place a fraudulent ballot among the genuine ballots.
            <br />
            <br />
            (8) A person may not commit theft of a ballot...
            <br />
            <br />
            (9)(a) A person may not... sell, make an offer with the actual intent to sell, purchase or make an offer
            with the actual intent to purchase, for money or other valuable consideration, any official ballot, [or]
            replacement ballot..."
          </p>
        </blockquote>
        <Formik
          initialValues={{
            agreed: false
          }}
        >
          {({ values }) => {
            return (
              <>
                <FormCheckbox name="agreed" caption="&nbsp;I understand." />

                {values.agreed && (
                  <button type="button" onClick={() => next()}>
                    Start again with another voter
                  </button>
                )}
                {!values.agreed && <input type="submit" value="Start again with another voter" disabled={true} />}

                <button type="button" onClick={() => done()}>
                  Never mind, I'm done
                </button>
              </>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
