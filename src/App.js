import React from "react";

function App() {
  return (
    <div>
      <h1>Welcome to Tadbeer Institute</h1>
      <a href={`${process.env.PUBLIC_URL}/survey-form1.html`}>Open Survey Form</a>
    </div>
  );
}

export default App;
