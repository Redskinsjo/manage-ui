import React from "react";
import store from "./store";
import { Container } from "./index";
import { Provider } from "react-redux";

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}
