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
            <h3>
              {voterInfo.FirstName} {voterInfo.LastName}
              <br />
              {voterInfo.Address1}
              <br />
              {voterInfo.City} {voterInfo.ZipCode}
            </h3>
            <div className="formSpacer" />
            <p>Please click CONFIRM to receive an email with your ballot</p>
          </>
        )}
        {!validated && !findByName.isLoading && !findByAddress.isLoading && (
          <>
            <h1 className={!validated ? "error" : ""}>
              <b>VoterId: {voterId}</b>
            </h1>
            <div className="formSpacer" />
            <p>TODO: Add support for provisional ballots</p>
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
