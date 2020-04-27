import useFetch from "./useFetch";
import AppSettings from "../AppSettings";

export default function useFindVoter(parameters, enabled) {
  const baseUrl = AppSettings.FindVoter;
  const keys = Object.keys(parameters);
  const arglist = keys.map(key => `${key}=${parameters[key]}`).join("&");
  const url = enabled ? (arglist ? `${baseUrl}&${arglist}` : null) : null;
  return useFetch(url);
}
