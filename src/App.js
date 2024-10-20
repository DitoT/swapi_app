import React, { useState } from "react";
import DataList from "./components/DataList";
function App() {
  const [selectedTab] = useState("characters");

  return (
    <div className="App">
      <DataList selectedTab={selectedTab} />
    </div>
  );
}

export default App;
