import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { userSelector } from '../../features/auth'

const Profile = () => {

  const { user } = useSelector(userSelector)
  // console.log(user); // shows an object that contains information about the user

  const favoriteMovies = []

  const logout = () => {
    localStorage.clear();
    window.location.href = '/'; // sends back to the home page
  }

  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' gutterBottom>My Profile</Typography>
        <Button color='inherit' onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies.length ? <Typography variant='h5'>Add favorites or watchlist some movies to see theme here!</Typography> : <Box> Favorite movies </Box>}
    </Box>
  )
}

export default Profile