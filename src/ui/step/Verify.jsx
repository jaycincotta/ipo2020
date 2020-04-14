import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../FormField";

export default function Verify({ next, prev, restart, findByName, findByAddress }) {
  const validated =
    findByAddress.response &&
    findByAddress.response.length === 1 &&
    findByName.response &&
    findByName.response.length === 1 &&
    findByName.response[0].VoterId === findByAddress.response[0].VoterId;
  const voterId = validated ? findByAddress.response[0].VoterId : "Not Found";
  return (
    <div>
      <h2>Please Confirm Your Voter Information</h2>
      {validated && (
        <>
          <h3>
            <b>VoterId: {voterId}</b>
          </h3>
          <p>Please click CONFIRM to receive an email with your ballot</p>
        </>
      )}
      {!validated && (
        <>
          <h1 className={!validated ? "error" : ""}>
            <b>VoterId: {voterId}</b>
          </h1>
          <p>
            Please click <b>CONFIRM</b> to receive an email with your provisional ballot
          </p>
        </>
      )}
      <button type="button" onClick={() => next()}>
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
