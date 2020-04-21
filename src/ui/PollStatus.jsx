import React from "react";

const PollsOpen = Date.parse("28 Apr 2020 08:00:00 PDT");
const PollsClose = new Date("12 May 2020 20:00:00 PDT");

const OPEN = "OPEN";
const CLOSED = "CLOSED";
const TESTING = "TESTING";

function PollStatus() {
  const now = Date.now();
  if (now < PollsOpen) return TESTING;
  if (now > PollsClose) return CLOSED;
  return OPEN;
}

function ArePollsOpen() {
  return PollStatus() === OPEN;
}

function ArePollsClosed() {
  return PollStatus() === CLOSED;
}

function PollTestingWarning() {
  return PollStatus() === TESTING ? <div id="headerWarning">FOR TESTING ONLY!</div> : "";
}

export { PollTestingWarning, PollStatus, ArePollsOpen, ArePollsClosed };
