// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Import dari 'react-dom/client'
import { Provider } from "react-redux"; // Import Provider
import store from "./store/store"; // Import store yang dibuat dengan Redux Toolkit
import App from "./App";

// Buat root dan render aplikasi
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
