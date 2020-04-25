export default function getStarId(voterId, data) {
  const url = `https://star.ipo.vote/survey/getstarid/${voterId}/?email=${data.email}&phone=${data.phone}&ipoList=${data.ipoOptIn}&starList=${data.starOptIn}`;
  const options = {
    method: "get",
    headers: {
      Accept: "application/json"
    }
  };

  console.log("getStarId", voterId, url, options);

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
