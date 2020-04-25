export default function getStarId(data) {
  const url = `https://star.ipo.vote/survey/getstarid/${data.voterId}/?email=${data.email}&phone=${
    data.phone
  }&ipoList=${data.ipoOptIn ? "true" : "false"}&starList=${data.starOptIn ? "true" : "false"}&birthDate=${
    data.birthDate
  }`;
  const options = {
    method: "get",
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
      return json.starId;
    });

  return starId;
}
