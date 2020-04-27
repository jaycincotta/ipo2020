import AppSettings from "../AppSettings";

export default function getStarId(data) {
  const email = data.email.replace("+", "%2B");
  const url = `${AppSettings.GetStarId}/${data.voterId}/?email=${email}&phone=${data.phone}&ipoList=${
    data.ipoOptIn ? "true" : "false"
  }&starList=${data.starOptIn ? "true" : "false"}&birthDate=${data.birthDate}`;
  const options = {
    method: "get",
    credentials: "include",
    headers: {
      Accept: "application/json"
    }
  };
  //      Cookie: "authID=4; authToken=2ab184496bd92a5508ad091ae7e0cca4b1128fa371efaa8ec5ef8e5c16314b38df278b655a887eff77d321d91f7624bb497cfe610e584d6f57d48c78fe3d55e0"

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
    })
    .then(json => {
      return json.starId;
    });

  return starId;
}
