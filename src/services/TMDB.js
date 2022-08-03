// this file is used to make request calls to the TMDB api -- https://developers.themoviedb.org/3/getting-started/introduction

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY; // refers to the TMDB API key. The value of the key is located in the .env file
const page = 1;

/* 

  https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1 
  
    -- the url to make a request for popular movies

    -- https://api.themoviedb.org/3 -- is used for the base url as shown line 12

    -- popular?api_key=<<api_key>> -- is for the endpoint to make request for popular movies as shown in line 27
    
*/

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: builder => ({
    // get movie geners
    getGeners: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`
    }),

    // get popular movies
    getMovies: builder.query({
      query: () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`
    })
  })
});

export const { useGetMoviesQuery, useGetGenersQuery } = tmdbApi; // this are the hook that redux toolkit creates in order to use them in other components
