import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GraphQLProvider from "./apollo/index";
import ReduxProvider from "./redux/Wrapper";
import "./translations/i18n";

ReactDOM.render(
  <React.StrictMode>
    <GraphQLProvider>
      <ReduxProvider />
    </GraphQLProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
