import React from "react";

function App() {
  return (
    <div>
      <h1>Welcome to Tadbeer Institute</h1>
      <p>Choose a form to fill:</p>
      <ul>
      <ul>
  <li><a href={`${process.env.PUBLIC_URL}/survey-form1.html`}>Survey Form 1</a></li>
  <li><a href={`${process.env.PUBLIC_URL}/survey-form2.html`}>Survey Form 2</a></li>
  <li><a href={`${process.env.PUBLIC_URL}/Third-survey.html`}>Survey Form 3</a></li>
</ul>

      </ul>
    </div>
  );
}

export default App;
