import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GraphQLProvider from "./apollo/index";
import ReduxProvider from "./redux/Wrapper";
import "./translations/i18n";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<>Loading...</>}>
      <GraphQLProvider>
        <ReduxProvider />
      </GraphQLProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
