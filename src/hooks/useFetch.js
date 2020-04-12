import { useState, useEffect } from "react";

export default function useFetch(url, options, refreshTrigger, callback, disabled) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dependencies = Array.isArray(refreshTrigger) ? refreshTrigger : [refreshTrigger];

  useEffect(() => {
    setResponse(null);
    setError(null);
    const fetchData = async () => {
      console.log("Fetching...", url);
      setIsLoading(true);
      fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then(responseJson => {
          setResponse(responseJson);
          setIsLoading(false);
          if (callback) {
            callback(responseJson);
          }
        })
        .catch(err => {
          console.log(`ERROR on ${url}`, err);
          setError({ status: err.status, message: "Request failed" });
          setIsLoading(false);
        });
    };
    if (url && !disabled) {
      // If no url, there's nothing to fetch
      fetchData();
    }
  }, dependencies);
  return { response, error, isLoading };
}
