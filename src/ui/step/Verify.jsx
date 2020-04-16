import React from "react";

export default function Verify({ next, prev, restart, formData, setFormData, findByName, findByAddress }) {
  const validated =
    findByAddress.response &&
    findByAddress.response.length === 1 &&
    findByName.response &&
    findByName.response.length === 1 &&
    findByName.response[0].VoterId === findByAddress.response[0].VoterId;
  const voterId = validated ? findByAddress.response[0].VoterId : "Not Found";
  const voterInfo = validated ? findByAddress.response[0] : 0;

  function Confirm(next) {
    setFormData({
      ...formData,
      voterId: voterInfo.VoterId,
      address: voterInfo.Address1,
      city: voterInfo.City
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
            <p>Please click CONFIRM to receive an email with your ballot</p>
          </>
        )}
        {!validated && !findByName.isLoading && !findByAddress.isLoading && (
          <>
            <h1 className={!validated ? "error" : ""}>
              <b>VoterId: {voterId}</b>
            </h1>
            <p>
              Please click <b>CONFIRM</b> to receive an email with your provisional ballot
            </p>
          </>
        )}
        {(findByName.isLoading || findByAddress.isLoading) && <p>Loading...</p>}
        <button type="button" onClick={() => Confirm(next)}>
          CONFIRM
        </button>

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
