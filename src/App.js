import React, { useState } from "react";
import "./index.css";
import "./App.css";
import useFindVoter from "./hooks/useFindVoter";
import useLocalStorage from "./hooks/useLocalStorage";
import getStarId from "./hooks/getStarId";
import Welcome from "./ui/step/Welcome";
import Thankyou from "./ui/step/Thankyou";
import StartOver from "./ui/step/StartOver";
import RepeatVoter from "./ui/step/RepeatVoter";
import EditEmail from "./ui/step/EditEmail";
import EditName from "./ui/step/EditName";
import EditAddress from "./ui/step/EditAddress";
import Verify from "./ui/step/Verify";
import FetchViewer from "./ui/FetchViewer";
import RequestBallot from "./RequestBallot";
import AppSettings from "./AppSettings";
import PollsClosed from "./ui/step/PollsClosed";
import { ArePollsClosed } from "./ui/PollStatus";
import Header from "./ui/Header";

const CURRENT_STEP_KEY = "ipo2020-currentStep";
const FORM_DATA_KEY = "ipo2020-formData";

// Wizard-Related stuff

const WELCOME = 0;
const EDIT_EMAIL = 1;
const EDIT_NAME = 2;
const EDIT_ADDRESS = 3;
const VERIFY = 4;
const THANKYOU = 5;
const START_OVER = 9;
const REPEAT_VISITOR = -1;

export default function App() {
  // Voter Data
  const initialValues = {
    starId: "",
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
    city: "",
    ipoOptIn: false,
    starOptIn: false
  };

  const [formData, setFormData] = useLocalStorage(FORM_DATA_KEY, initialValues);

  const [debugMode, setDebugMode] = useState(false);
  const [step, setStep] = useLocalStorage(CURRENT_STEP_KEY, WELCOME);
  const [whiteOut, setWhiteout] = useState(false);

  const nameAvailable = formData.firstName && formData.lastName && formData.birthYear;

  const findVoter = useFindVoter(
    {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthYear: formData.birthYear
    },
    nameAvailable
  );
  const filteredVoters = findVoter.response
    ? // eslint-disable-next-line
      findVoter.response.filter(v => v.HouseNum == formData.houseNum && v.ZipCode == formData.zipcode)
    : [];
  const findByName = findVoter;
  const findByAddress = { error: null, isLoading: false, response: filteredVoters };

  const denullify = str => (str ? str : "");

  const updateFreshChat = user => {
    user = user ? user : formData;
    window.fcWidget.user.setProperties({
      email: denullify(user.email),
      phone: denullify(user.phone),
      firstName: denullify(user.firstName),
      lastName: denullify(user.lastName),
      birthDate: denullify(user.birthDate),
      starId: denullify(user.starId),
      voterId: denullify(user.voterId)
    });
  };

  const GoTo = step => {
    updateFreshChat(formData);
    setStep(step);
  };

  const CompleteRegistration = () => {
    setWhiteout(true);
    GoTo(REPEAT_VISITOR);
    window.location = "https://www.starvoting.us/";
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

  const GoToThankyou = updates => {
    const newFormData = { ...formData, ...updates };
    setFormData(newFormData);
    console.log("GoToThankyou", newFormData);

    setTimeout(() => {
      getStarId(newFormData)
        .then(starId => {
          console.log("getStarId returned", starId);
          newFormData.starId = starId;
          setFormData(newFormData);
          console.log("Requesting email", newFormData);
          RequestBallot(newFormData)
            .then(() => console.log("RequestBallot return!"))
            .catch(err => console.log("RequestBallot FAILED: ", err));
        })
        .catch(err => {
          console.log("FAIL", err);
        });
    }, 10);
    GoTo(THANKYOU);
  };

  const GoToStartOver = () => {
    GoTo(START_OVER);
  };

  function ResetForm() {
    window.localStorage.removeItem(CURRENT_STEP_KEY);
    window.localStorage.removeItem(FORM_DATA_KEY);
    setFormData(initialValues);
    window.fcWidget.user
      .clear()
      .then(() => console.log("Freshchat reset"))
      .catch(() => console.log("Error ignored when Freshchat reset"));
    setStep(WELCOME);
  }

  if (ArePollsClosed()) {
    return (
      <>
        <Header />
        <PollsClosed />
      </>
    );
  }
  if (whiteOut) return "";

  return (
    <div id="page">
      <Header reset={() => ResetForm()} debug={() => setDebugMode(!debugMode)} />
      <div id="main">
        <div className="bigContainer">
          {step === REPEAT_VISITOR && <RepeatVoter next={GoToVerify} restart={GoToStartOver} formData={formData} />}
          {step === WELCOME && <Welcome next={GoToEditEmail} />}
          {step === EDIT_EMAIL && (
            <EditEmail next={GoToEditName} prev={GoToWelcome} formData={formData} setFormData={setFormData} />
          )}
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
          {step === THANKYOU && <Thankyou next={GoToStartOver} done={CompleteRegistration} formData={formData} />}
          {step === START_OVER && <StartOver next={ResetForm} done={CompleteRegistration} formData={formData} />}
        </div>
        <p className="version">
          <i>
            {AppSettings.Version}
            {" | "}
            <a className="privacy" href="https://bit.ly/ipo2020-privacy" target="privacy">
              Privacy Policy
            </a>
          </i>
        </p>

        {debugMode && (
          <div className="content">
            <pre>formData: {JSON.stringify(formData, null, 2)}</pre>
            <FetchViewer name="FindVoter" result={findVoter} />
          </div>
        )}
      </div>
    </div>
  );
}
