import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Set the base URL and Authorization header for all axios requests
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`;
// console.log("Access Token from .env:", process.env.REACT_APP_ACCESS_TOKEN);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
