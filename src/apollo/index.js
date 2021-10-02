import React from "react";
import { devUri, prodUri, suffix } from "./uris";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

devUri = devUri + suffix;
prodUri = prodUri + suffix;

const uri = process.env.NODE_ENV === "development" ? devUri : prodUri;

const httpLink = new HttpLink({
  uri,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  headers: { "Content-Type": "application/json" },
  credentials: "omit",
});

export default function GraphQLProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
