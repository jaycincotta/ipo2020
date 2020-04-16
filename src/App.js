import React, { useState } from "react";
import "./index.css";
import "./App.css";
import useVoterData from "./hooks/useVoterData";
import useStarId from "./hooks/useStarId";
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
    //setConfirmed(true);
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
    setVoterId(null);
    setStarId(null);
    setConfirmed(false);
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
  const findByAddress = useVoterData(
    "FindByAddress",
    {
      houseNum: formData.houseNum,
      zipcode: formData.zipcode,
      birthYear: formData.birthYear
    },
    addressAvailale
  );
  // const searchByName = useVoterData(
  //   "SearchByName",
  //   {
  //     firstName: formData.firstName ? formData.firstName.substr(0, 1) : "",
  //     lastName: formData.lastName,
  //     birthYear: formData.birthYear
  //   },
  //   nameAvailable
  // );
  // const searchByAddress = useVoterData(
  //   "SearchByAddress",
  //   {
  //     houseNum: formData.houseNum,
  //     zipcode: formData.zipcode
  //   },
  //   addressAvailale
  // );

  const [starId, setStarId] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [voterId, setVoterId] = useState(null);

  const getStarId = useStarId(voterId, confirmed);

  if (!voterId && confirmed && findByName.response && !findByName.isLoading && findByName.response[0].VoterId) {
    setVoterId(findByName.response[0].VoterId);
  }
  if (!starId && confirmed && getStarId.response && !getStarId.isLoading) {
    setStarId(getStarId.response.starId);
  }

  const myVoteURL = MyVoteURL(formData.firstName, formData.lastName, formData.birthDate);

  return (
    <div id="page">
      <div id="pageHeader">
        <img id="headerLogo" src="https://star.vote/web/images/starvote_logo.png" alt="Logo" />
        <h1>
          IPO Presidential Preference Poll
          <br />
          and Statewide Primary Election
        </h1>
      </div>
      <div id="main">
        <div className="bigContainer">
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
              findByName={findByName}
              findByAddress={findByAddress}
            />
          )}
          {step === THANKYOU && <Thankyou next={GoToSurvey} />}
        </div>
        {debugMode && (
          <div className="content">
            <pre>formData: {JSON.stringify(formData, null, 2)}</pre>
            <FetchViewer name="GetStarId" result={getStarId} />
            <FetchViewer name="FindByName" result={findByName} />
            <FetchViewer name="FindByAddress" result={findByAddress} />
            {/* <FetchViewer name="SearchByName" result={searchByName} />
          <FetchViewer name="SearchByAddress" result={searchByAddress} /> */}
          </div>
        )}
      </div>
      <div id="footer" class="ui-footer ui-bar-inherit">
        <a href={myVoteURL} target="MyVote">
          Verify My Voter Record
        </a>{" "}
        | <a href="mailto:support@equal.vote">Email Support</a> |{" "}
        <a href="https://www.starvoting.us/" data-role="none">
          Learn more about STAR Voting
        </a>{" "}
        |{" "}
        <a
          href=""
          onClick={e => {
            setDebugMode(!debugMode);
            e.preventDefault();
          }}
        >
          {debugMode ? "Hide" : "Show"} Debug
        </a>{" "}
        |{" "}
        <a href="" onClick={() => ResetForm()}>
          Reset
        </a>
      </div>
    </div>
  );
}
