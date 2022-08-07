// this file is responsible for creating material ui css stylesheet for the App.js

import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%"
  },
  toolbar: {
    height: "70px"
  },
  content: {
    flexGrow: "1",
    padding: "2em",
    width: "100%"
  }
}));
