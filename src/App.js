import React, { useState } from "react";
import "./App.css";
import useVoterData from "./hooks/useVoterData";
import useLocalStorage from "./hooks/useLocalStorage";
import Welcome from "./ui/step/Welcome";
import Thankyou from "./ui/step/Thankyou";
import RepeatVoter from "./ui/step/RepeatVoter";
import EditEmail from "./ui/step/EditEmail";
import EditName from "./ui/step/EditName";
import EditAddress from "./ui/step/EditAddress";
import Verify from "./ui/step/Verify";
import MyVoteURL from "./MyVoteURL";
import FetchViewer from "./ui/FetchViewer";

const CURRENT_STEP_KEY = "ipo2020-currentStep";
const FORM_DATA_KEY = "ipo2020-formData";

// Wizard-Related stuff

const WELCOME = 0;
const EDIT_EMAIL = 1;
const EDIT_NAME = 2;
const EDIT_ADDRESS = 3;
const VERIFY = 4;
const THANKYOU = 9;
const REPEAT_VISITOR = -1;

export default function App() {
  const [debugMode, setDebugMode] = useState(false);
  const [step, setStep] = useLocalStorage(CURRENT_STEP_KEY, WELCOME);

  const GoTo = step => {
    setStep(step);
  };

  const GoToWelcome = () => {
    GoTo(WELCOME);
  };

  const GoToEditEmail = () => {
    GoTo(EDIT_EMAIL);
  };

  const GoToEditName = () => {
    GoTo(EDIT_NAME);
  };

  const GoToEditAddress = () => {
    GoTo(EDIT_ADDRESS);
  };

  const GoToVerify = () => {
    GoTo(VERIFY);
  };

  const GoToThankyou = () => {
    GoTo(THANKYOU);
  };

  const GoToSurvey = () => {
    setStep(REPEAT_VISITOR);
    window.location = "https://star.vote/startrek/";
  };

  // Voter Data
  const initialValues = {
    voterId: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    birthYear: "",
    houseNum: "",
    zipcode: "",
    address: "",
    city: ""
  };
  const [formData, setFormData] = useLocalStorage(FORM_DATA_KEY, initialValues);

  function ResetForm() {
    window.localStorage.removeItem(CURRENT_STEP_KEY);
    window.localStorage.removeItem(FORM_DATA_KEY);
    setFormData(initialValues);
    setStep(WELCOME);
  }
  const nameAvailable = formData.firstName && formData.lastName && formData.birthYear;
  const addressAvailale = formData.houseNum && formData.zipcode && formData.birthYear;

  const findByName = useVoterData(
    "FindByName",
    {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthYear: formData.birthYear
    },
    nameAvailable
  );
  const searchByName = useVoterData(
    "SearchByName",
    {
      firstName: formData.firstName ? formData.firstName.substr(0, 1) : "",
      lastName: formData.lastName,
      birthYear: formData.birthYear
    },
    nameAvailable
  );
  const findByAddress = useVoterData(
    "FindByAddress",
    {
      houseNum: formData.houseNum,
      zipcode: formData.zipcode,
      birthYear: formData.birthYear
    },
    addressAvailale
  );
  const searchByAddress = useVoterData(
    "SearchByAddress",
    {
      houseNum: formData.houseNum,
      zipcode: formData.zipcode
    },
    addressAvailale
  );

  const myVoteURL = MyVoteURL(formData.firstName, formData.lastName, formData.birthDate);

  return (
    <div className="page">
      <h1>
        2020 IPO Presidential Preference Poll
        <br />
        and Statewide Primary Election
      </h1>
      {step === REPEAT_VISITOR && <RepeatVoter next={GoToWelcome} />}
      {step === WELCOME && <Welcome next={GoToEditEmail} />}
      {step === EDIT_EMAIL && <EditEmail next={GoToEditName} formData={formData} setFormData={setFormData} />}
      {step === EDIT_NAME && (
        <EditName
          next={GoToEditAddress}
          prev={GoToEditEmail}
          formData={formData}
          setFormData={setFormData}
          findByName={findByName}
        />
      )}
      {step === EDIT_ADDRESS && (
        <EditAddress
          next={GoToVerify}
          prev={GoToEditName}
          formData={formData}
          setFormData={setFormData}
          findByName={findByName}
          findByAddress={findByAddress}
        />
      )}
      {step === VERIFY && (
        <Verify
          next={GoToThankyou}
          prev={GoToEditAddress}
          restart={GoToEditEmail}
          formData={formData}
          setFormData={setFormData}
          searchByName={searchByName}
          searchByAddress={searchByAddress}
        />
      )}
      {step === THANKYOU && <Thankyou next={GoToSurvey} />}
      <br />
      <hr />
      <p>
        <a href={myVoteURL} target="MyVote">
          Verify My Voter Record
        </a>{" "}
        | <a href="mailto:support@equal.vote">Email Support</a>&nbsp;&nbsp;&nbsp;
        <button type="button" onClick={() => setDebugMode(!debugMode)}>
          {debugMode ? "Hide" : "Show"} Debug Info
        </button>
        &nbsp;&nbsp;&nbsp;
        <button type="button" onClick={() => ResetForm()}>
          Reset Form
        </button>
      </p>
      {debugMode && (
        <>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
          <FetchViewer name="FindByName" result={findByName} />
          <FetchViewer name="FindByAddress" result={findByAddress} />
          <FetchViewer name="SearchByName" result={searchByName} />
          <FetchViewer name="SearchByAddress" result={searchByAddress} />
        </>
      )}
    </div>
  );
}
