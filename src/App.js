import React from "react";
import "./App.css";
import useVoterData from "./hooks/useVoterData";
import useLocalStorage from "./hooks/useLocalStorage";
import Welcome from "./ui/step/Welcome";
import Thankyou from "./ui/step/Thankyou";
import RepeatVoter from "./ui/step/RepeatVoter";
import EditEmail from "./ui/step/EditEmail";
import EditName from "./ui/step/EditName";
import EditAddress from "./ui/step/EditAddress";
import MyVoteURL from "./MyVoteURL";

// Wizard-Related stuff

const WELCOME = 0;
const EDIT_EMAIL = 1;
const EDIT_NAME = 2;
const EDIT_ADDRESS = 3;
const THANKYOU = 9;
const REPEAT_VISITOR = -1;

export default function App() {
  const [step, setStep] = useLocalStorage("ipo2020-currentStep", WELCOME);

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

  const GoToThankyou = () => {
    GoTo(THANKYOU);
  };

  const GoToSurvey = () => {
    setStep(REPEAT_VISITOR);
    window.location = "https://star.vote/startrek/";
  };

  // Voter Data
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    birthYear: "",
    houseNum: "",
    zipcode: ""
  };
  const [formData, setFormData] = useLocalStorage("ipo2020-formData", initialValues);

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
  // const searchByName = useVoterData(
  //   "SearchByName",
  //   {
  //     firstName: formData.firstName ? formData.firstName.substr(0, 1) : "",
  //     lastName: formData.lastName,
  //     birthYear: formData.birthYear
  //   },
  //   nameAvailable
  // );
  const findByAddress = useVoterData(
    "FindByAddress",
    {
      houseNum: formData.houseNum,
      zipcode: formData.zipcode,
      birthYear: formData.birthYear
    },
    addressAvailale
  );
  // const searchByAddress = useVoterData(
  //   "SearchByAddress",
  //   {
  //     houseNum: formData.houseNum,
  //     zipcode: formData.zipcode
  //   },
  //   addressAvailale
  // );

  const myVoteURL = MyVoteURL(formData.firstName, formData.lastName, formData.birthYear);

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
        <EditName next={GoToEditAddress} formData={formData} setFormData={setFormData} findByName={findByName} />
      )}
      {step === EDIT_ADDRESS && (
        <EditAddress
          next={GoToThankyou}
          formData={formData}
          setFormData={setFormData}
          findByName={findByName}
          findByAddress={findByAddress}
        />
      )}
      {step === THANKYOU && <Thankyou next={GoToSurvey} />}
      <br />
      <hr />
      <p>
        <a href={myVoteURL} target="MyVote">
          Verify My Voter Record
        </a>{" "}
        | <a href="mailto:support@equal.vote">Email Support</a>
      </p>
    </div>
  );
}
