import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import ToggleColorModeProvider from "./utils/ToggleColorMode"; // allows toggling light or dark mode of the app

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>
  </Provider>
);

/*

  <Provider store={store}>: store -- refers to entire state in which each component has access to. The 'store' is created in src/app/store

*/
