import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { userSelector } from '../../features/auth'
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '..';

const Profile = () => {

  const { user } = useSelector(userSelector)
  // console.log(user); // shows an object that contains information about the user

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  // tells redux to keep update on a user' favorite movies & moive watch list
  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/'; // sends back to the home page
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length
        ? <Typography variant="h5">Add favorites or watchlist some movies to see them here!</Typography>
        : (
          <Box>
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
            <RatedCards title="Watchlist" data={watchlistMovies} />
          </Box>
        )}
    </Box>
  )
}

export default Profile