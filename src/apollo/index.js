import React from "react";
import AppWrapper from "../redux/Wrapper";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
const devUri = "http://localhost:4000/graphql";
const prodUri = `${
  process.env.PROD_GRAPHQL_API || "https://manage-graphql-api.herokuapp.com"
}/graphql`;
const client = new ApolloClient({
  uri: process.env.NODE_ENV === "development" ? devUri : prodUri,
  cache: new InMemoryCache(),
  headers: { "Content-Type": "application/json" },
});

export default function Apollo() {
  return (
    <ApolloProvider client={client}>
      <AppWrapper />
    </ApolloProvider>
  );
}
