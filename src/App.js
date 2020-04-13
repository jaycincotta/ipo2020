import React, { useState } from "react";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import Welcome from "./ui/step/Welcome";
import Thankyou from "./ui/step/Thankyou";
import RepeatVoter from "./ui/step/RepeatVoter";

const WELCOME_STEP = 0;
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

  const GoToThankyou = () => {
    GoTo(THANKYOU_STEP);
  };

  const GoToSurvey = () => {
    setStep(REPEAT_VISITOR_STEP);
    window.location = "https://star.vote/startrek/";
  };

  return (
    <div className="page">
      <h1>
        2020 IPO Presidential Preference Poll
        <br />
        and Statewide Primary Election
      </h1>
      {step === REPEAT_VISITOR_STEP && <RepeatVoter next={GoToWelcome} />}
      {step === WELCOME_STEP && <Welcome next={GoToThankyou} />}
      {step === THANKYOU_STEP && <Thankyou next={GoToSurvey} />}
      <br />
      <hr />
      <p>
        If you have questions, you can reach us at <a href="mailto:support@equal.vote">support@equal.vote</a>
      </p>
    </div>
  );
}
