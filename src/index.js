import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // in order to use material ui
const theme = createTheme({});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

/*

  <Provider store={store}>: store -- refers to entire state in which each component has access to. The 'store' is created in src/app/store

*/
