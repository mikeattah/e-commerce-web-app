import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "./store/cache";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache,
});

const element = (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>
  </React.StrictMode>
);

const container = document.getElementById("root");

ReactDOM.render(element, container);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
