import React from "react";
import useVoterData from "../hooks/useVoterData";

export default function () {
  const voter = { firstName: "Kevin", lastName: "Cincotta", birthYear: 1997 };
  const result = useVoterData("SearchByName", voter);

  return JSON.stringify(result);
}
