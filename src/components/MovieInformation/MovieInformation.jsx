import React, { useState } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import useStyles from './styles';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { MovieList } from '..';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const MovieInformation = () => {
  const classes = useStyles();
  const { id } = useParams(); // gets the id of a specific movie
  const { data, isFetching, error } = useGetMovieQuery(id); // uses the specific movie id to gets it's data and also is isFetching & error objects
  // console.log(data); // shows an object that contain information (title, release date, tagline, etc) about a movie
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // refers to if the modal for the movie trailer is open

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });
  // console.log(recommendations);


  // when fetching/loading the data from the TMDB server
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  // if there is an error
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );
  }

  // add movie to favorites
  const addToFavorites = async () => {

  };

  // add movie to watch list
  const addToWatchlist = async () => {

  };

  return (
    <Grid container className={classes.containerSpaceAround}>

      <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '30px' }}>
        {/* movie poster */}
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction="column" lg={7}>

        <Typography variant="h3" align="center" gutterBottom>
          {/* name of movie & release date. Note ?. are used in case the property (Ex .title, .tagline ...) does not exist */}
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          {/* movie tagline */}
          {data?.tagline}
        </Typography>

        <Grid item className={classes.containerSpaceAround}>

          <Box display="flex" align="center">
            {/* movie rating */}
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
              {/* movie vote average */}
              {data?.vote_average} / 10
            </Typography>
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            {/* movie runtime & language */}
            {data?.runtime}min | Language: {data?.spoken_languages[0].name}
          </Typography>

        </Grid>

        <Grid item className={classes.genresContainer}>

          {/* provide links to different geners associtated with the specific movie */}
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}

        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>

        <Typography style={{ marginBottom: '2rem' }}>
          {/* movie's overview */}
          {data?.overview}
        </Typography>

        <Typography variant="h5" gutterBottom>Top Cast</Typography>

        {/* only shows cast memeber who have image */}
        <Grid item container spacing={2}>
          {data && data.credits.cast.map((character, i) => (
            character.profile_path && (
              <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
                <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                {/* name of cast memeber */}
                <Typography color="textPrimary">{character?.name}</Typography>
                {/* the name of the character that the cast member plays in the movie */}
                <Typography color="textSecondary">
                  {character.character.split('/')[0]}
                </Typography>
              </Grid>
            )
          )).slice(0, 6)}
        </Grid>

        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>

            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                {/* movie's website */}
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                {/* movie's web link to IMDB */}
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                {/* movie's trailer */}
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                {/* specifies if the movie is a favorite of the user */}
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                {/* specifies if the movie is on the user's watchlist */}
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                {/* send the user back to the homepage */}
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>

          </div>
        </Grid>

      </Grid>

      {/* show movie recommendation */}
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : <Box>Sorry, nothing was found.</Box>}
      </Box>

      {/* movie trailer */}
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>

    </Grid>
  )
}

export default MovieInformation