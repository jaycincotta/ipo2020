import React, { useState } from "react";
import "./index.css";
import "./App.css";
import useVoterData from "./hooks/useVoterData";
import useFindVoter from "./hooks/useFindVoter";
import useLocalStorage from "./hooks/useLocalStorage";
import getStarId from "./hooks/getStarId";
import Welcome from "./ui/step/Welcome";
import Thankyou from "./ui/step/Thankyou";
import RepeatVoter from "./ui/step/RepeatVoter";
import EditEmail from "./ui/step/EditEmail";
import EditName from "./ui/step/EditName";
import EditAddress from "./ui/step/EditAddress";
import Verify from "./ui/step/Verify";
import MyVoteURL from "./MyVoteURL";
import FetchViewer from "./ui/FetchViewer";
import RequestBallot from "./RequestBallot";
import AppSettings from "./AppSettings";

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
    city: ""
  };

  const [formData, setFormData] = useLocalStorage(FORM_DATA_KEY, initialValues);

  const [debugMode, setDebugMode] = useState(false);
  const [step, setStep] = useLocalStorage(CURRENT_STEP_KEY, WELCOME);
  const [confirmed, setConfirmed] = useState(false);
  const [loadingStarId, setLoadingStarId] = useState(false);
  const [starId, setStarId] = useState(null);
  const [voterId, setVoterId] = useState(null);

  const nameAvailable = formData.firstName && formData.lastName && formData.birthYear;
  const addressAvailale = formData.houseNum && formData.zipcode && formData.birthYear;

  const findVoter = useFindVoter(
    {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthYear: formData.birthYear
    },
    nameAvailable
  );
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

  //const getStarId = useStarId(voterId, confirmed);

  if (!voterId && confirmed && findByName.response && !findByName.isLoading && findByName.response[0].VoterId) {
    setVoterId(findByName.response[0].VoterId);
  }

  // if (confirmed && !loadingStarId && voterId && !starId && !formData.starId) {
  //   console.log("Loading?", loadingStarId);
  //   setLoadingStarId(true);
  //   setTimeout(() => {
  //     console.log("Still loading?", loadingStarId);
  //     getStarId(voterId)
  //       .then(starId => {
  //         setStarId(starId);
  //         console.log(`StarId is ${starId}`);
  //         setFormData({
  //           ...formData,
  //           starId: starId
  //         });
  //         setTimeout(() => setLoadingStarId(false), 100);
  //       })
  //       .catch(err => {
  //         console.log("FAIL", err);
  //         setConfirmed(false);
  //       });
  //   }, 10);
  // }

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
    const validated =
      findByAddress.response &&
      findByAddress.response.length >= 1 &&
      findByName.response &&
      findByName.response.length >= 1 &&
      findByAddress.response.filter(a => findByName.response.some(n => a.VoterId === n.VoterId)).length >= 1;
    const matches = validated
      ? findByAddress.response.filter(a => findByName.response.some(n => a.VoterId === n.VoterId))
      : null;
    const voterInfo = matches && matches.length === 1 ? matches[0] : null;
    const voterId1 = voterInfo ? voterInfo.VoterId : "Not Found";
    console.log("Confirmed?", validated, voterId1, confirmed, loadingStarId, voterId, starId, formData.starId);

    //if (!confirmed && !loadingStarId && voterId && !starId && !formData.starId) {
    setConfirmed(true);
    console.log("Loading?", loadingStarId);
    setLoadingStarId(true);
    setTimeout(() => {
      console.log("Still loading?", loadingStarId);
      getStarId(voterId1, formData.email)
        .then(starId => {
          console.log("getStarId returned", starId);
          setStarId(starId);
          console.log(`StarId is ${starId}`);
          setFormData(prevState => {
            const updatedData = {
              ...formData,
              starId: starId
            };
            console.log("Requesting email", updatedData);
            RequestBallot(updatedData)
              .then(() => console.log("RequestBallot return!"))
              .catch(err => console.log("RequestBallot FAILED: ", err));
            return updatedData;
          });
          setTimeout(() => setLoadingStarId(false), 100);
        })
        .catch(err => {
          console.log("FAIL", err);
          setConfirmed(false);
        });
    }, 10);
    //}
    GoTo(THANKYOU);
  };

  const GoToSurvey = () => {
    setStep(REPEAT_VISITOR);
    window.location = "https://star.vote/startrek/";
  };

  function ResetForm() {
    setVoterId(null);
    setStarId(null);
    setConfirmed(false);
    window.localStorage.removeItem(CURRENT_STEP_KEY);
    window.localStorage.removeItem(FORM_DATA_KEY);
    setFormData(initialValues);
    setStep(WELCOME);
  }

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

  // if (!starId && confirmed && getStarId.response && !getStarId.isLoading) {
  //   setStarId(getStarId.response.starId);
  // }

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
        <p className="version">
          <i>{AppSettings.Version}</i>
        </p>
        {debugMode && (
          <div className="content">
            <pre>formData: {JSON.stringify(formData, null, 2)}</pre>
            {/* <FetchViewer name="GetStarId" result={getStarId} /> */}
            <FetchViewer name="FindVoter" result={findVoter} />
            <FetchViewer name="FindByName" result={findByName} />
            <FetchViewer name="FindByAddress" result={findByAddress} />
            {/* <FetchViewer name="SearchByName" result={searchByName} />
          <FetchViewer name="SearchByAddress" result={searchByAddress} /> */}
          </div>
        )}
      </div>
      <div id="footer2" className="ui-footer ui-bar-inherit">
        <a href={myVoteURL} target="MyVote">
          Verify My Voter Record
        </a>{" "}
        | <a href="http://support.ipo.vote">Contact Voter Support</a>|{" "}
        <span
          className="buttonLink"
          href=""
          onClick={e => {
            setDebugMode(!debugMode);
            e.preventDefault();
          }}
        >
          {debugMode ? "Hide" : "Show"} Debug
        </span>{" "}
        |{" "}
        <span className="buttonLink" href="" onClick={() => ResetForm()}>
          Reset
        </span>
      </div>
    </div>
  );
}
