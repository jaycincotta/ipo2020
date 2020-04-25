import React from "react";

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
  const voterId = voterInfo ? voterInfo.VoterId : "Not Found";

  console.log("VoterId:", voterId);
  function Confirm(next) {
    setFormData(prevState => {
      return {
        ...prevState,
        voterId: voterInfo.VoterId,
        address: voterInfo.Address1,
        city: voterInfo.City
      };
    });
    next();
  }
  return (
    <>
      <div className="bigContainerTitle">
        <h2>Please Confirm Your Voter Information</h2>{" "}
      </div>
      <div className="content">
        {validated && (
          <>
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
                  <td className="label">Independent Party of Oregon Mailing&nbsp;List:</td>
                  <td className="value">
                    {formData.ipoOptIn ? "Send me occasional updates" : "DO NOT send me any email"}
                  </td>
                </tr>
                <tr>
                  <td className="label">STAR&nbsp;Voting Mailing&nbsp;List:</td>
                  <td className="value">
                    {formData.starOptIn ? "Send me occasional updates" : "DO NOT send me any email"}
                  </td>
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
            <div className="formSpacer" />
            <p>
              Please click <b>CONFIRM</b> to receive an email with your ballot
            </p>
          </>
        )}
        {!validated && !findByName.isLoading && !findByAddress.isLoading && (
          <>
            <h1 className="error">
              <b>Your voter record was not found</b>
            </h1>
            <div className="formSpacer" />
            <p>
              You are not in our list of eligible voters. If you believe you should be, and you are positive that you
              were registered Ind or NAV by March 1st, please email{" "}
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
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              console.log("CLICK!");
              Confirm(next);
            }}
          >
            CONFIRM
          </button>
        )}
        <button type="button" onClick={() => prev()}>
          Go Back
        </button>

        <button type="button" onClick={() => restart()}>
          Start Over
        </button>
      </div>
    </>
  );
}
