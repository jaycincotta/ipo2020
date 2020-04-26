import React from "react";

export default function Eligibility() {
  return (
    <>
      <h2>Please note that to be eligible to vote in this primary:</h2>
      <div className="eligibility">
        <ul className="list1">
          <li>You must be registered to vote in Oregon,</li>
          <li>Your voter registration must be active, and</li>
          <li>
            You must <b>either</b> be:
            <ul className="list2">
              <li>A registered member of the Independent Party of Oregon, or</li>
              <li>
                A non-affliliated voter not registered with <b>any</b> political party.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
