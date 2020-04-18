import AppSettings from "./AppSettings";

export default async function RequestBallot(voterInfo) {
  const url = AppSettings.RequestBallot;

  const result = fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(voterInfo)
  })
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
