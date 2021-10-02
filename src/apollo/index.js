import React from "react";
import AppWrapper from "../redux/Wrapper";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : process.env.PROD_GRAPHQL_API + "/graphql",
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
