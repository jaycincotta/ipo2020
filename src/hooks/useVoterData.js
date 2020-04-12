import useFetch from "./useFetch";

export default function useVoterData(method, parameters) {
  const baseUrl = `https://ipo2020-dev-appservice.azurewebsites.net/api/${method}?code=RL9gvBjKUqu7L0AL0OZorm/Zt4Jw4JfJFVvynKN93bjFihZBfkaICw==`;
  const keys = Object.keys(parameters);
  const arglist = keys.map(key => `${key}=${parameters[key]}`).join("&");
  const url = arglist ? `${baseUrl}&${arglist}` : null;
  return useFetch(url);
}
