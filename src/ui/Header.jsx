import React from "react";
//import { PollTestingWarning } from "./PollStatus";
export default function Header({ reset, debug }) {
  return (
    <div id="pageHeader">
      <div className="mainMenu">
        <a href="https://support.ipo.vote/en/support/home" target="help">
          Help
        </a>
        &nbsp;|&nbsp;
        <a href="https://support.ipo.vote/es/support/home" target="help">
          Ayuda
        </a>
      </div>
      {/* <PollTestingWarning onClick={debug} /> */}
      <div>
        <img id="headerLogo" src="https://star.ipo.vote/web/images/ipo_logo_notext.png" alt="Logo" onClick={reset} />
        <h1>
          Independent Party of Oregon
          <br />
          Voter Registration
        </h1>
      </div>
    </div>
  );
}
