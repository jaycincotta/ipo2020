import useFetch from "./useFetch";

export default function useFindVoter(parameters, enabled) {
  const baseUrl = `https://ipo2020-dev-appservice.azurewebsites.net/api/FindVoter?code=RL9gvBjKUqu7L0AL0OZorm/Zt4Jw4JfJFVvynKN93bjFihZBfkaICw==`;
  const keys = Object.keys(parameters);
  const arglist = keys.map(key => `${key}=${parameters[key]}`).join("&");
  const url = enabled ? (arglist ? `${baseUrl}&${arglist}` : null) : null;
  return useFetch(url);
}
