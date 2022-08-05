// https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id -- contains the information on how to authenticate with TDMB API

import axios from "axios";

// makes a call the TMDB server using axios
export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY
  }
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get("/authentication/token/new"); // make a request to authenticate a new token

    const token = data.request_token; // gets the token and assign it to a const variable 'token'

    // if the data is sent as an success
    if (data.success) {
      localStorage.setItem("request_token", token); // set/add the token to local storage

      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`; // uses the token to redirect to TMDB authentican approve page.

      //  window.location.href -- returns the href (URL) of the current page
      // window.location.origin -- refers to the url of the site
    }
  } catch (error) {
    console.log("Sorry, your token could not be created.");
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem("request_token"); // get the token from local storage

  // if the token exist
  if (token) {
    try {
      // makes a request for a new session id from the TMDB server
      const {
        data: { session_id }
      } = await moviesApi.post("authentication/session/new", {
        request_token: token
      });

      localStorage.setItem("session_id", session_id); // stores the session id in the local storage

      return session_id; // return the session id from the createSessionId()
    } catch (error) {
      console.log(error);
    }
  }
};
