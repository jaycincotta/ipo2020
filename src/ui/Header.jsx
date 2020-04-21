import React from "react";
import { PollTestingWarning } from "./PollStatus";
export default function Header() {
  return (
    <div id="pageHeader">
      <PollTestingWarning />
      <img id="headerLogo" src="https://star.ipo.vote/web/images/ipo_logo_notext.png" alt="Logo" />
      <h1>
        Independent Party of Oregon
        <br />
        Voter Registration
      </h1>
    </div>
  );
}
