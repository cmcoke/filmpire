// this file is used to make request calls to the TMDB api -- https://developers.themoviedb.org/3/getting-started/introduction

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY; // refers to the TMDB API key. The value of the key is located in the .env file

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
    // get the different types of geners
    getGeners: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`
    }),

    // get movies by [type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // get movies by search
        if (searchQuery) {
          return `/search/movie/?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // get movies by category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "string") {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // get movies by genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "number") {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // get popular movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      }
    }),

    //* get a specific movie
    getMovie: builder.query({
      query: id => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
    }),

    // get movie recommendations
    getRecommendations: builder.query({
      query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
    })
  })
});

export const { useGetGenersQuery, useGetMoviesQuery, useGetMovieQuery, useGetRecommendationsQuery } = tmdbApi; // this are the hook that redux toolkit creates in order to use them in other components
