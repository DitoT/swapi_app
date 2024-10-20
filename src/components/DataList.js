import React, { useState, useEffect } from "react";
import DataItem from "./DataItem";
import SearchBar from "./SearchBar";
import "./styles.css";

const DataList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      let apiUrl = "";
      let isIndexSearch = false;

      if (searchTerm.toLowerCase() === "people") {
        apiUrl = "https://swapi.dev/api/people/";
      } else if (searchTerm.toLowerCase() === "starships") {
        apiUrl = "https://swapi.dev/api/starships/";
      } else if (searchTerm.toLowerCase() === "planets") {
        apiUrl = "https://swapi.dev/api/planets/";
      } else if (searchTerm.includes("/")) {
        const [base, index] = searchTerm.split("/");
        const numIndex = parseInt(index, 10) - 1;
        isIndexSearch = true;

        switch (base.toLowerCase()) {
          case "people":
            apiUrl = "https://swapi.dev/api/people/";
            break;
          case "starships":
            apiUrl = "https://swapi.dev/api/starships/";
            break;
          case "planets":
            apiUrl = "https://swapi.dev/api/planets/";
            break;
          default:
            apiUrl = "";
        }

        if (apiUrl) {
          fetch(apiUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              if (data.results && data.results[numIndex]) {
                setData([data.results[numIndex]]);
              } else {
                setData([]);
              }
            })
            .catch((error) => console.log("Fetch error:", error));
          return;
        }
      } else {
        const searchApiUrl = `https://swapi.dev/api/people/?search=${searchTerm}`;
        fetch(searchApiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => setData(data.results || []))
          .catch((error) => console.log("Fetch error:", error));
      }

      if (apiUrl && !isIndexSearch) {
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => setData(data.results || []))
          .catch((error) => console.log("Fetch error:", error));
      }
    } else {
      setData([]);
    }
  }, [searchTerm]);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  return (
    <div className="search-container">
      <h1>Star Wars Explorer</h1>
      <SearchBar onRequestSearch={handleSearch} />
      <p className="hint">
        Need a hint? Try people/1/ or planets/3/ or starships/9/
      </p>
      <div className="allDetails">
        {data.length > 0 ? (
          <ul>
            {data.map((item) => (
              <DataItem
                key={item.name || item.url}
                item={item}
                type={item.type}
              />
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default DataList;
