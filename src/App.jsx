import React from "react";

import BasicModal from "./BasicModal";
function App() {
  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          color: "#ec407a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          padding: "10px",
        }}
      >
        <h1 style={{ textAlign: "center", margin: 0 }}>create a test</h1>
      </div>

      <BasicModal />
    </>
  );
}

export default App;
