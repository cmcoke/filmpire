import React, { useState, useEffect } from "react";
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from "@mui/material";
import { Menu, AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import useStyles from './styles';
import { Sidebar, Search } from '..'
import { fetchToken, createSessionId, moviesApi } from "../../utils";
import { setUser, userSelector } from '../../features/auth';
import { useDispatch, useSelector } from 'react-redux';


const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false)
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)'); // defines that if the screen is larger than 600px it is no longer mobile device.
  const theme = useTheme(); // use to determine if we are in light or dark mode.
  const dispatch = useDispatch();


  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      // checks if the token exist
      if (token) {
        // and then checks if the session id exist
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`); // get user data
          dispatch(setUser(userData)); // sets the user' account in the redux store
        } else {
          const sessionId = await createSessionId(); // creates a new session id if one does not exist 
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`); // uses the new session id created in line 36 to make a call to get the user' account
          dispatch(setUser(userData)); // sets the user' account in the redux store
        }
      }
    };

    logInUser();
  }, [token]);


  return (
    <>
      {/* the AppBar component is section of the app that contains mobile icon (on mobile devices), toggle button to change to the light or dark mode of the app, search component & login button */}
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {/* show menu icon only on mobile devices */}
          {isMobile && (
            <IconButton color='inherit' edge='start' style={{ outline: 'none' }} onClick={() => setMobileOpen((prevState) => !prevState)} className={classes.menuButton}>
              <Menu />
            </IconButton>
          )}
          {/* toggle used to change to the light or dark mode of the app */}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => { }}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {/* if not on a mobile screen show the search component */}
          {!isMobile && <Search />}
          {/* relates to if the user is logged out or logged in */}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={fetchToken}>  {/* onClick={fetchToken} -- the fetchToken function is located in the index.js which is in the utils folder */}
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button color='inherit' component={Link} to={`/profile/${user.id}`} className={classes.linkButton} onClick={() => { }}>
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar style={{ width: 30, height: 30 }}
                  alt='Profile'
                  src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' />
              </Button>
            )}
          </div>
          {/* if on a mobile screen show the search component */}
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      {/* the below refers to the navigation section that contains the sidebar component */}
      <div>
        <nav className={classes.drawer}>
          {/* classes={{}} -- is used to overide/add styles to the material ui components  */}
          {isMobile ? (
            <Drawer variant="temporary" anchor="right" open={mobileOpen} classes={{ paper: classes.drawerPaper }} ModalProps={{ keepMounted: true }} onClose={() => setMobileOpen((prevState) => !prevState)}>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  )
};

export default NavBar;
