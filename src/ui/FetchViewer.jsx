import React from "react";

export default function FetchViewer({ name, result }) {
  if (!result || (!result.response && !result.isLoading && !result.error)) return "";

  return (
    <div>
      <h3>{name}</h3>
      {result.response && <pre>{JSON.stringify(result.response, null, 2)}</pre>}
      {result.isLoading && <i>Loading...</i>}
      {result.error && <pre className="error">{JSON.stringify(result.error, null, 2)}</pre>}
    </div>
  );
}
