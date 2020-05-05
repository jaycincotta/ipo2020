import AppSettings from "../AppSettings";

export default function getStarId(data) {
  const email = data.email.replace("+", "%2B");
  // Zero-pad month and date
  const dateOfBirth = data.birthDate
    .toLocaleString()
    .split(/\D/)
    .slice(0, 3)
    .map(num => num.padStart(2, "0"))
    .join("/");
  const url = `${AppSettings.GetStarId}/${data.voterId}/?email=${email}&phone=${data.phone}&ipoList=${
    data.ipoOptIn ? "true" : "false"
  }&starList=${data.starOptIn ? "true" : "false"}&birthDate=${dateOfBirth}`;
  const options = {
    method: "get",
    credentials: "include",
    headers: {
      Accept: "application/json"
    }
  };

  console.log("getStarId", data.voterId, url, options);

  const starId = fetch(url, options)
    .then(response => {
      console.log("Response", response);
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then(json => {
      if (json.error) {
        throw new Error("Not Authorized");
      }
      return json.starId;
    });

  return starId;
}
