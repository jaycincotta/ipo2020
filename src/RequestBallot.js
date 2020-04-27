import AppSettings from "./AppSettings";

export default async function RequestBallot(voterInfo) {
  const url = AppSettings.RequestBallot;
  const request = { ...voterInfo, template: "BallotLink" };
  console.log("REQUESTBALLOT", url, request);
  const email = voterInfo.email.replace("+", "%2B");
  const result = fetch(
    `${url}&template=ballotLink&starId=${voterInfo.starId}&email=${email}&firstName=${voterInfo.firstName}&lastName=${voterInfo.lastName}`
  )
    // const result = fetch(url, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(request)
    // })
    .then(response => {
      console.log("Response from RequestBallot", response);
      if (!response.ok) {
        throw response;
      }
      return response.text();
    })
    .catch(err => {
      console.log("FAIL RequestBallot", err);
    });

  return result;
}
