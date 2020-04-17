import useFetch from "./useFetch";

export default function useStarId(voterId, enabled) {
  const baseUrl = "https://staging.ipo.vote/survey/getstarid";
  const url = voterId && enabled ? `${baseUrl}/${voterId}` : "";
  const options = {
    method: "get",
    headers: {
      // Basic Auth header generated with:
      // https://www.blitter.se/utils/basic-authentication-header-generator/
      // Authorization: "Basic c3RhcjppcG8yMDIwIQ==",
      Accept: "application/json"
    }
  };
  return useFetch(url, options);
}
