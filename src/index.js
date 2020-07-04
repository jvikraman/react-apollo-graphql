import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Import our compiled tailwind css file via build step.
import "./build/tailwind.css";
import App from "./App";

// Graphql endpoint.
const uri = `http://localhost:4000`;
// const uri = `https://swapi.graph.cool/`;

// Instantiate a new apollo client.
const client = new ApolloClient({ uri });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
