// this file is responsible for creating material ui css stylesheet for the NavBar.js

import { makeStyles } from "@mui/styles";
const drawerWidth = 240;

export default makeStyles(theme => ({
  toolbar: {
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "240px",
    // only applies to mobile devices
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      flexWrap: "wrap"
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // only applies to devices that are larger than mobile devices
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  drawer: {
    // only applies to devices that are larger than mobile devices
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  linkButton: {
    // '&:hover' {} -- is used to apply styles when hovering over the element
    "&:hover": {
      color: "white !important",
      textDecoration: "none"
    }
  }
}));
