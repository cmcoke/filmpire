import { CssBaseline } from "@mui/material";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Actors, MovieInformation, Movies, NavBar, Profile } from "./"; // the stated components are imported from the index.js file that is located in the components folder
import useStyles from "./styles"; // import css styles from the styles.js file in the component folder

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline /> {/* applies material ui' default css styles */}
      <NavBar /> {/* ensures that the NavBar component appears alongside the other components */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={"/movie/:id"}>
            <MovieInformation />
          </Route>
          <Route exact path={"/actors/:id"}>
            <Actors />
          </Route>
          <Route exact path={"/"}>
            <Movies />
          </Route>
          <Route exact path={"/profile/:id"}>
            <Profile />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
