import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Paper } from '@material-ui/core';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { useStyles } from '../style/styling';
import Button from '@material-ui/core/Button'
import { searchById } from '../util/omdb';

export function DisplayCard(props) {
  const classes = useStyles();
  const initialLabel = (localStorage.getItem(props.imdbId) === null) ? <TurnedInNotIcon /> : <TurnedInIcon />
  console.log(JSON.stringify(props))
  console.log("Is " + props.imdbId + " in the watchlist: " + (localStorage.getItem(props.imdbId) !== null))
  const [addOrRemoveIcon, setAddOrRemoveIcon] = React.useState(initialLabel)
  const addOrRemoveFromWatchList = async (imdbId) => {
    if (localStorage.getItem(imdbId) == null) {
      var result = await searchById(imdbId)
      localStorage.setItem(imdbId, JSON.stringify(result));
      setAddOrRemoveIcon(<TurnedInIcon />)
      console.log("Added to local storage: " + imdbId)
    } else {
      localStorage.removeItem(imdbId);
      setAddOrRemoveIcon(<TurnedInNotIcon />)
      console.log("Removed from local storage: " + imdbId)
    }
  }

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box>
        <img className={classes.image} src={props.poster} alt="recipe thumbnail" />
      </Box>
      <Box padding="1rem" justifyContent="bottom">
        <Typography variant="h2" noWrap={true} component="h2">
          {props.title}
        </Typography>
        <Typography variant="subtitle1">
          {props.year}
        </Typography>
        {/** TEMP BUTTON */}
      </Box>
      <Box className={classes.displayBottomRight}>
        <Button className={classes.bottomRightButton} onClick={() => addOrRemoveFromWatchList(props.imdbId)}>
          {addOrRemoveIcon}
        </Button>
      </Box>
    </Paper>
  );
}

export function BreakdownCard(props) {
  //use to display full movie information
  //   <Grid container spacing={3}>
  //   <Grid xs={4} justify="center" alignItems="center">
  //     <img src={props.poster} alt="movie poster" />    
  //   </Grid>
  //   <Grid item xs={6}>
  //     <Typography variant="h5">
  //       {props.title}
  //     </Typography>
  //     <Typography variant="subtitle2">
  //       {props.year}
  //     </Typography>
  //   </Grid>
  //   <Grid item xs={2}>
  //     <IconButton>
  //       <TurnedInNotIcon />
  //     </IconButton>
  //   </Grid>
  // </Grid>
}

