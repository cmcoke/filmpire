import React, { useState, useEffect } from "react";
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList, Pagination } from "..";
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'


const Movies = () => {
  const [page, setPage] = useState(1) // refers to the page number
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory) // retrieves data from the redux slice called 'genreIdOrCategoryName' from the 'currentGenreOrCategory.js' file in the features folder
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery }) // getting the data from genreIdOrCategoryName and the state 'page' in lines 10
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg')); // for screens that are large
  const numberOfMovies = lg ? 16 : 18; // if on a large screen show a total of 16 movies else show 18

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
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      {/* pagination */}
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
};

export default Movies;
