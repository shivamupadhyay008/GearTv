import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from "./context/usercontext";

import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
