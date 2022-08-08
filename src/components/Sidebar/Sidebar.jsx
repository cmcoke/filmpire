import React, { useEffect } from 'react'
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/styles'
import useStyles from './styles'
import { useGetGenersQuery } from "../../services/TMDB";
import genreIcons from '../../assets/genres'
import { useDispatch, useSelector } from 'react-redux'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory) // retrieves data from the redux slice called 'genreOrCategory' from the 'currentGenreOrCategory.js' file in the features folder
  // console.log(genreIdOrCategoryName) // shows the name of the categories & id number of the different genres 
  const { data, isFetching } = useGetGenersQuery()
  // console.log(data); // shows the various genres
  const dispatch = useDispatch()
  const theme = useTheme();
  const classes = useStyles();
  const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
  const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

  const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' }
  ]

  // close the sidebar menu when clicking on a link on mobile screens
  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to='/' className={classes.imageLink}>
        <img className={classes.image} src={theme.palette.mode === 'light' ? blueLogo : redLogo} alt='Filmpire logo' />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to='/'>
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display='flex' justifyContent='center'>
            <CircularProgress />
          </Box>
        ) : data.genres.map(({ name, id }) => (
          <Link key={id} className={classes.links} to='/'>
            <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  )
}

export default Sidebar