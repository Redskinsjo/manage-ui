import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Apollo from "./apollo/index";
// import AppWrapper from "./redux/Wrapper";
import "./translations/i18n";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<>Loading...</>}>
      <Apollo />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
