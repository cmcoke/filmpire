import React, { useState, useEffect } from "react";
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "..";



const Movies = () => {

  const { data, error, isFetching } = useGetMoviesQuery()
  // console.log(data);

  // becuase the fetching of data is not instantley, redux's 'isFetching' can be used  to act a loading state when the data is being fetch from TMDB server
  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='4rem' />
      </Box>
    )
  }

  // if a movie does not exist
  if (!data.results.length) {
    return (
      <Box display='flex' alignItems='center' mt='20px'>
        <Typography variant="h4">
          No movies matched that named in our database.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    )
  }

  // if an error occurs
  if (error) return 'An error has occured'

  // render the movie list
  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
