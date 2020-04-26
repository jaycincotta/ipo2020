import React from "react";
import { Formik, Form } from "formik";
import FormCheckbox from "../FormCheckbox";
import Eligibility from "../Eligibility";

export default function Verify({ next, prev, restart, formData, setFormData, findByName, findByAddress }) {
  const validated =
    findByAddress.response &&
    findByAddress.response.length >= 1 &&
    findByName.response &&
    findByName.response.length >= 1 &&
    findByAddress.response.filter(a => findByName.response.some(n => a.VoterId === n.VoterId)).length >= 1;
  const matches = validated
    ? findByAddress.response.filter(a => findByName.response.some(n => a.VoterId === n.VoterId))
    : null;
  //TODO: If we had an multiple matches on name/address/dob, this assumes first one
  const voterInfo = matches && matches.length >= 1 ? matches[0] : null;

  return (
    <>
      <div className="bigContainerTitle">
        <h2>Please Confirm Your Voter Information</h2>{" "}
      </div>
      <div className="content">
        {validated && (
          <table className="confirm">
            <tbody>
              <tr>
                <td className="label">Name:</td>
                <td className="value">
                  {voterInfo.FirstName} {voterInfo.LastName}
                </td>
              </tr>
              <tr>
                <td className="label">Email:</td>
                <td className="value">{formData.email}</td>
              </tr>
              <tr>
                <td className="label">Phone:</td>
                <td className="value">{formData.phone}</td>
              </tr>
              <tr>
                <td className="label">Address:</td>
                <td className="value">
                  {voterInfo.Address1}
                  <br />
                  {voterInfo.City} {voterInfo.ZipCode}
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <Formik
          initialValues={{
            ipoOptIn: formData.ipoOptIn,
            starOptIn: formData.starOptIn
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const updates = {
                ipoOptIn: values.ipoOptIn,
                starOptIn: values.starOptIn,
                voterId: voterInfo.VoterId,
                address: voterInfo.Address1,
                city: voterInfo.City
              };
              setTimeout(() => next(updates), 0);
            } catch (error) {
              console.log("Error", error);
            }
            setSubmitting(false);
          }}
        >
          {() => {
            return (
              <Form>
                {validated && (
                  <div>
                    <div className="optins">
                      <FormCheckbox
                        name="ipoOptIn"
                        caption="Send me occasional updates from the Independent&nbsp;Party&nbsp;of&nbsp;Oregon"
                      />
                      <FormCheckbox name="starOptIn" caption="Send me occasional updates from STAR&nbsp;Voting" />
                    </div>
                    <div className="formSpacer" />
                    <p>
                      Please click <b>CONFIRM</b> to receive an email with your ballot
                    </p>
                  </div>
                )}
                {!validated && !findByName.isLoading && !findByAddress.isLoading && (
                  <>
                    <h1 className="error">
                      <b>Your voter record was not found</b>
                    </h1>
                    <div className="formSpacer" />
                    <p>
                      The Independent Party of Oregon (IPO) has opened the party's 2020 primary election to the state's
                      900,000 non-affiliated voters, in addition to the Independent party's 125,000 members registered
                      by March 1st, 2020.
                    </p>
                    <Eligibility />
                    <h2>You are not in our list of eligible voters. Common reasons include:</h2>
                    <div className="eligibility">
                      <ul className="list1">
                        <li>Registered with another party (Democrat, Republican, etc)</li>
                        <li>Inactive voter registration status</li>
                        <li>Registered to vote under a different spelling of your name</li>
                        <li>Registered to vote under a different residence address</li>
                        <li>
                          Registration not active by the March 1<sup>st</sup> deadline
                        </li>
                      </ul>
                    </div>
                    <p>
                      If you believe you should eligible to vote in this primary, and you are positive that you were
                      registered Ind or NAV by March 1<sup>st</sup>, please email{" "}
                      <a
                        href={`mailto:support@equal.vote?subject=VoterId not found for ${formData.firstName} ${formData.lastName}&body=I believe I am eligible to vote in the IPO Primary but have been unable to register online. Thanks in advance for helping me to locate my voter record.%0D%0A%0D%0AMy full name, date of birth and address, as registered with the Oregon Secretary of State, are listed below:%0D%0A%0D%0A`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        support@equal.vote
                      </a>{" "}
                      with your Name, date of birth, and address.
                    </p>
                  </>
                )}
                {(findByName.isLoading || findByAddress.isLoading) && <p>Loading...</p>}
                {validated && (
                  <button className="good" type="submit">
                    CONFIRM
                  </button>
                )}
                <button type="button" onClick={() => prev()}>
                  Go Back
                </button>

                <button type="button" onClick={() => restart()}>
                  Start Over
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
