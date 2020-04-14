import React from "react";

export default function Verify({ next, prev, restart, formData, setFormData, searchByName, searchByAddress }) {
  const validated =
    searchByAddress.response &&
    searchByAddress.response.length === 1 &&
    searchByName.response &&
    searchByName.response.length === 1 &&
    searchByName.response[0].VoterId === searchByAddress.response[0].VoterId;
  const voterId = validated ? searchByAddress.response[0].VoterId : "Not Found";
  const voterInfo = validated ? searchByAddress.response[0] : 0;
  function BallotRequest(email, voterInfo) {
    return {
      Email: email,
      ...voterInfo
    };
  }
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
    <div>
      <h2>Please Confirm Your Voter Information</h2>
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
      {!validated && !searchByName.isLoading && !searchByAddress.isLoading && (
        <>
          <h1 className={!validated ? "error" : ""}>
            <b>VoterId: {voterId}</b>
          </h1>
          <p>
            Please click <b>CONFIRM</b> to receive an email with your provisional ballot
          </p>
        </>
      )}
      {(searchByName.isLoading || searchByAddress.isLoading) && <p>Loading...</p>}
      <button type="button" onClick={() => Confirm(next)}>
        CONFIRM
      </button>
      &nbsp;&nbsp;&nbsp;
      <button type="button" onClick={() => prev()}>
        Go Back
      </button>
      &nbsp;&nbsp;&nbsp;
      <button type="button" onClick={() => restart()}>
        Start Over
      </button>
    </div>
  );
}
