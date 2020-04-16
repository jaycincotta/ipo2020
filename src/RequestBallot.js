export default async function RequestBallot(voterInfo) {
  const method = "RequestBallot";
  const baseUrl = `https://ipo2020-dev-appservice.azurewebsites.net/api/${method}?code=RL9gvBjKUqu7L0AL0OZorm/Zt4Jw4JfJFVvynKN93bjFihZBfkaICw==`;
  //const baseUrl = `http://localhost:7071/api/${method}?code=RL9gvBjKUqu7L0AL0OZorm/Zt4Jw4JfJFVvynKN93bjFihZBfkaICw==`;
  const endpoint = baseUrl;

  const result = await fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(voterInfo)
  });
  console.log("RESULT", result);
}