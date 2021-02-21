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

//Card used to display movie poster along with title and year released
export function DisplayCard(props) {
  const classes = useStyles();

  //Determine the label to indicate where a movie/series has been added or not to watchlist
  const initialLabel = (localStorage.getItem(props.imdbId) === null) ? <TurnedInNotIcon /> : <TurnedInIcon />

  //Instantiate the state value that will be updated and used to render 
  const [addOrRemoveIcon, setAddOrRemoveIcon] = React.useState(initialLabel)

  //Method used to add or remove an item from local storage and as a result the watch list
  const addOrRemoveFromWatchList = async (imdbId) => {
    if (localStorage.getItem(imdbId) == null) {
      var result = await searchById(imdbId)
      localStorage.setItem(imdbId, JSON.stringify(result));
      setAddOrRemoveIcon(<TurnedInIcon />)
    } else {
      localStorage.removeItem(imdbId);
    }

    //Run callback and pass true to indicate a change has occured
    if (props.changeCallback != undefined) {
      props.changeCallback(true)
    }
  }

  //Used for open/closing dialog
  const [open, setOpen] = React.useState(false);

  //Item to be displayed in the dialog
  const [itemDetails, setItemDetails] = React.useState(null)

  //State value used to update the card icon when the dialog state is updated
  const [isWatchlistUpdated, setIsWatchlistUpdated] = React.useState(false)

  //used by a button to open the dialog component
  const handleClickOpen = async (imdbId) => {
    var result = await searchById(imdbId)
    setItemDetails(result)
    setOpen(true);
  };

  //used by a button to close the dialog component
  const handleClose = () => {
    setItemDetails(null)
    setOpen(false);
  };

  //Update card watchlist icon when show has been added/removed in the dialog
  React.useEffect(() => {
    if (props.changeCallback != undefined) {
      props.changeCallback(true)
      setOpen(false)
    } else if (itemDetails != null) {
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
          <img className={classes.image} src={props.poster == 'N/A' ? ImageHolder : props.poster} alt="recipe thumbnail" />
        </Button>
      </Box>
      <Box padding="1rem" justifyContent="bottom">
        <Typography variant="h3" noWrap={true} component="h3">
          {props.title}
        </Typography>
        <Typography variant="subtitle1">
          {props.year}
        </Typography>
      </Box>
      <Box className={classes.displayBottomRight}>
        <Button className={classes.bottomRightButton} onClick={() => addOrRemoveFromWatchList(props.imdbId)}>
          {addOrRemoveIcon}
        </Button>
      </Box>
      {
        //Only render the dialog when an item is available
        itemDetails != null && <DetailsDialog isWatchlistUpdatedCallback={setIsWatchlistUpdated} item={itemDetails} open={open} handleClose={handleClose} />
      }
    </Paper>
  );
}

//card used by wishlist that allows additional components to be displayed inside the body
export function CustomCard(props) {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.paper}>
      <Box style={{ "backgroundColor": "#E6E6E6" }}>
        <Box className={classes.customCard_image}>
          <img className={classes.icon} src={props.image} alt={props.imagealt} />
        </Box>
        <Box className={classes.customCard_titleContainer}>
          <Typography className={classes.customCard_titleText} variant="h2" component="h2">{props.title}</Typography>
        </Box>
      </Box>
      <Box padding="1rem">
        {props.children}
      </Box>
    </Paper>
  )
}

