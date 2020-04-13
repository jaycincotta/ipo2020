import React from "react";
import "./App.css";
import useVoterData from "./hooks/useVoterData";
import useLocalStorage from "./hooks/useLocalStorage";
import Welcome from "./ui/step/Welcome";
import Thankyou from "./ui/step/Thankyou";
import RepeatVoter from "./ui/step/RepeatVoter";
import EditName from "./ui/step/EditName";
import EditAddress from "./ui/step/EditAddress";

// Wizard-Related stuff

const WELCOME_STEP = 0;
const EDIT_NAME_STEP = 1;
const EDIT_ADDRESS_STEP = 2;
const THANKYOU_STEP = 9;
const REPEAT_VISITOR_STEP = -1;

export default function App() {
  const [step, setStep] = useLocalStorage("currentStep", WELCOME_STEP);

  const GoTo = step => {
    setStep(step);
  };

  const GoToWelcome = () => {
    GoTo(WELCOME_STEP);
  };

  const GoToEditName = () => {
    GoTo(EDIT_NAME_STEP);
  };

  const GoToEditAddress = () => {
    GoTo(EDIT_ADDRESS_STEP);
  };

  const GoToThankyou = () => {
    GoTo(THANKYOU_STEP);
  };

  const GoToSurvey = () => {
    setStep(REPEAT_VISITOR_STEP);
    window.location = "https://star.vote/startrek/";
  };

  // Voter Data
  const initialValues = {
    firstName: "",
    lastName: "",
    birthYear: "",
    houseNum: "",
    zipcode: ""
  };
  const [formData, setFormData] = useLocalStorage("formData", initialValues);

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

  return (
    <div className="page">
      <h1>
        2020 IPO Presidential Preference Poll
        <br />
        and Statewide Primary Election
      </h1>
      {step === REPEAT_VISITOR_STEP && <RepeatVoter next={GoToWelcome} />}
      {step === WELCOME_STEP && <Welcome next={GoToEditName} />}
      {step === EDIT_NAME_STEP && (
        <EditName
          next={GoToEditAddress}
          formData={formData}
          setFormData={setFormData}
          findByName={findByName}
          searchByName={searchByName}
        />
      )}
      {step === EDIT_ADDRESS_STEP && (
        <EditAddress
          next={GoToThankyou}
          formData={formData}
          setFormData={setFormData}
          findByAddress={findByAddress}
          searchByAddress={searchByAddress}
        />
      )}
      {step === THANKYOU_STEP && <Thankyou next={GoToSurvey} />}
      <br />
      <hr />
      <p>
        If you have questions, you can reach us at <a href="mailto:support@equal.vote">support@equal.vote</a>
      </p>
    </div>
  );
}
