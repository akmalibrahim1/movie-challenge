import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Paper } from '@material-ui/core';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { useStyles } from '../style/styling';
import Button from '@material-ui/core/Button'
import { searchById } from '../util/omdb';
import DetailsDialog from './dialog'
import ImageHolder from '../assets/image.svg'

export function DisplayCard(props) {
  const classes = useStyles();
  const initialLabel = (localStorage.getItem(props.imdbId) === null) ? <TurnedInNotIcon /> : <TurnedInIcon />
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

  //Dialog Controls
  const [open, setOpen] = React.useState(false);
  const [itemDetails, setItemDetails] = React.useState(null)
  const [isWatchlistUpdated, setIsWatchlistUpdated] = React.useState(false)
  const handleClickOpen = async (imdbId) => {
    var result = await searchById(imdbId)
    setItemDetails(result)
    setOpen(true);
  };
  const handleClose = (isAdded) => {
    setItemDetails(null)
    setOpen(false);
  };

  React.useEffect(() => {
    if (itemDetails != null) {
      if (localStorage.getItem(itemDetails.imdbID) == null) {
        setAddOrRemoveIcon(<TurnedInNotIcon />)
      } else {
        setAddOrRemoveIcon(<TurnedInIcon />)
      }
      setIsWatchlistUpdated(false)
    }
  }, [isWatchlistUpdated])

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box>
        <Button className={classes.image} disableTouchRipple={true} disableRipple={true} onClick={() => handleClickOpen(props.imdbId)}>
          <img className={classes.image} src={props.poster=='N/A' ? ImageHolder : props.poster} alt="recipe thumbnail" />
        </Button>
      </Box>
      <Box padding="1rem" justifyContent="bottom">
        <Typography variant="h3" noWrap={true} component="h3">
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
      { itemDetails != null && <DetailsDialog isWatchlistUpdatedCallback={setIsWatchlistUpdated} item={itemDetails} open={open} handleClose={handleClose} />}
    </Paper>
  );
}

export function CustomCard(props) {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.paper}>
      <Box style={{ "backgroundColor": "#E6E6E6" }}>
        <Box display="flex" flexGrow="1" height="50%" width="100%" justifyContent="center">
          <img className={classes.icon} src={props.image} alt={props.imagealt} />
        </Box>
        <Box display="flex" height="50%" width="100%" justifyContent="center">
          <Typography style={{ "marginTop": "auto", "paddingBottom": "2rem" }} variant="h2" component="h2">{props.title}</Typography>
        </Box>
      </Box>
      <Box padding="1rem">
        {props.children}
      </Box>
    </Paper>
  )
}

