import React, { useState, useEffect } from "react";

const DataDetails = ({ url, type }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) => console.log(error));
  }, [url]);

  if (!details) {
    return <p>Loading...</p>;
  }
  return (
    <div className="detailsBox">
      <pre>{JSON.stringify(details, null, 2)}</pre>
    </div>
  );
};

export default DataDetails;
