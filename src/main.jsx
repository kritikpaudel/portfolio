// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Use Vite's base to derive the Router basename (drop trailing slash)
const basename = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="https://kritikpaudel.github.io/portfolio/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
