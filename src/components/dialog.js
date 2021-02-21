import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Box, IconButton } from '@material-ui/core';
import { useStyles } from '../style/styling';
import CloseIcon from '@material-ui/icons/Close';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import ImageHolder from '../assets/image.svg'
import { getImdbLink } from '../util/omdb'
const addToWatchList = "Add To Watchlist"
const removeFromWatchlist = "Remove From Watchlist"
export default function DetailsDialog(props) {
    // const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const classes = useStyles();


    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    console.log(props.item)
    const initialIcon = (localStorage.getItem(props.item.imdbID) === null) ? <TurnedInNotIcon /> : <TurnedInIcon />
    const initialText = (localStorage.getItem(props.item.imdbID) === null) ? "Add To Watchlist" : "Remove From Watchlist"
    const [addOrRemoveText, setAddOrRemoveText] = React.useState(initialText)
    const [addOrRemoveIcon, setAddOrRemoveIcon] = React.useState(initialIcon)
    const addOrRemoveFromWatchList = async (item) => {
        if (item != null) {
            if (localStorage.getItem(item.imdbID) == null) {
                localStorage.setItem(item.imdbID, JSON.stringify(item));
                setAddOrRemoveIcon(<TurnedInIcon />)
                setAddOrRemoveText(removeFromWatchlist)
                console.log("Added to local storage: " + item.imdbID)
            } else {
                localStorage.removeItem(item.imdbID);
                setAddOrRemoveIcon(<TurnedInNotIcon />)
                setAddOrRemoveText(addToWatchList)
                console.log("Removed from local storage: " + item.imdbID)
            }
        }
    }
    return (
        <div>
            { props.item != null &&
                <Dialog
                    fullScreen={fullScreen}
                    open={props.open}
                    onClose={props.handleClose}
                    aria-labelledby="movie-dialog-box"
                >
                    <Box style={{ "display": "flex" }}>
                        <DialogTitle id="movie-dialog-box-title" style={{ "width": "80%" }}>{props.item.Title}</DialogTitle>
                        <Box style={{ "marginLeft": "auto" }}>
                            <IconButton onClick={props.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    {!fullScreen &&
                        <DialogContent display="flex" >
                            <Box display="flex" padding="0" height="50%" width="100%">
                                <Box height="100%" width="50%">
                                    <img className={classes.image} src={props.item.Poster == 'N/A' ? ImageHolder : props.item.Poster} alt={props.item.Title + " Poster"} />
                                </Box>
                                <Box flexGrow="1" paddingLeft="2rem">
                                    <Box>
                                        <ul className={classes.unstyledList}>
                                            <li>
                                                <span style={{ "fontWeight": "bold" }}>IMDB:</span> <a href={getImdbLink(props.item.imdbID)} target="_blank">{props.item.imdbRating}/10</a>
                                            </li>
                                            {
                                                props.item.Ratings.map((obj, index) => {
                                                    return (<li key={index}><span style={{ "fontWeight": "bold" }}>{obj.Source}:</span> {obj.Value}</li>)
                                                })
                                            }
                                        </ul>
                                    </Box>
                                    <Box paddingBottom="1rem">
                                        <span style={{ "fontWeight": "bold" }}>Age Rating:</span> {props.item.Rated}
                                    </Box>
                                    <Box paddingBottom="1rem">
                                        <span style={{ "fontWeight": "bold" }}>Released:</span> {props.item.Released}
                                    </Box>
                                    <Box paddingBottom="1rem">
                                        <span style={{ "fontWeight": "bold" }}>Runtime:</span> {props.item.Runtime}
                                    </Box>
                                    <Box paddingBottom="1rem">
                                        <span style={{ "fontWeight": "bold" }}>Genre:</span> {props.item.Genre}
                                    </Box>
                                    <Box paddingBottom="1rem">
                                        <span style={{ "fontWeight": "bold" }}>Directed By:</span> {props.item.Director}
                                    </Box>
                                </Box>
                            </Box>
                            <Box display="flex" paddingTop="1rem">
                                <DialogContentText style={{ "color": "black" }}>
                                    {props.item.Plot}
                                </DialogContentText>
                            </Box>
                        </DialogContent>
                    }
                    {fullScreen &&
                        <DialogContent display="flex" >
                            <Box display="flex" padding="0" height="100%" width="100%">
                                <Box height="100%" width="100%">
                                    <img className={classes.image} src={props.item.Poster == 'N/A' ? ImageHolder : props.item.Poster} alt={props.item.Title + " Poster"} />
                                </Box>
                            </Box>
                            <Box display="flex" paddingTop="1rem">
                                <DialogContentText style={{ "color": "black" }}>
                                    {props.item.Plot}
                                    <Box flexGrow="1">
                                        <Box>
                                            <ul className={classes.unstyledList}>
                                                <li>
                                                    <span style={{ "fontWeight": "bold" }}>IMDB:</span> {props.item.imdbRating}/10
                                    </li>
                                                {
                                                    props.item.Ratings.map((obj, index) => {
                                                        return (<li key={index}><span style={{ "fontWeight": "bold" }}>{obj.Source}:</span> {obj.Value}</li>)
                                                    })
                                                }
                                            </ul>
                                        </Box>
                                        <Box paddingBottom="1rem">
                                            <span style={{ "fontWeight": "bold" }}>Age Rating:</span> {props.item.Rated}
                                        </Box>
                                        <Box paddingBottom="1rem">
                                            <span style={{ "fontWeight": "bold" }}>Released:</span> {props.item.Released}
                                        </Box>
                                        <Box paddingBottom="1rem">
                                            <span style={{ "fontWeight": "bold" }}>Runtime:</span> {props.item.Runtime}
                                        </Box>
                                        <Box paddingBottom="1rem">
                                            <span style={{ "fontWeight": "bold" }}>Genre:</span> {props.item.Genre}
                                        </Box>
                                        <Box paddingBottom="1rem">
                                            <span style={{ "fontWeight": "bold" }}>Directed By:</span> {props.item.Director}
                                        </Box>
                                    </Box>
                                </DialogContentText>
                            </Box>
                        </DialogContent>
                    }
                    <DialogActions>
                        <Button className={classes.bottomRightButton} style={{ "marginBottom": "1rem", "marginRight": "1rem" }} onClick={() => { addOrRemoveFromWatchList(props.item); props.isWatchlistUpdatedCallback(); }}>
                            {addOrRemoveIcon} {addOrRemoveText}
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </div>
    );
}
