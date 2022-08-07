import React, { useState } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';


import useStyles from './styles';
import { useGetActorQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import { MovieList } from '..';

const Actors = () => {
  const classes = useStyles();
  const { id } = useParams(); // gets the id of a specific actor
  const [page, setPage] = useState(1); // refers to page number that contains the list of movies that the actor/actress are/is in
  const history = useHistory();
  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  // when fetching/loading the data from the TMDB server
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  // if there is an error
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
          Go back
        </Button>
      </Box>
    );
  }


  return (
    <Grid container spacing={3}>

      {/* image of actor/actress */}
      <Grid item lg={5} xl={4}>
        <img
          className={classes.image}
          src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
          alt={data?.name}
        />
      </Grid>

      {/* actor/actress name, birth date & bio */}
      <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

        {/* actor/actress name */}
        <Typography variant="h2" gutterBottom >
          {data?.name}
        </Typography>

        {/* actor/actress birth date */}
        <Typography variant="h5" gutterBottom >
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>

        {/* actor/actress bio */}
        <Typography variant="p" gutterBottom >
          {data?.biography || 'Sorry, no biography yet...'}
        </Typography>

        <Box marginTop="2rem" display="flex" justifyContent="space-around">
          <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
            IMDB
          </Button>
          <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
            Back
          </Button>
        </Box>

      </Grid>

      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        {/* show movie/s actor/actress is in */}
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
      </Box>

    </Grid>
  )
}

export default Actors