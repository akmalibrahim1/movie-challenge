import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Box } from '@material-ui/core';
import MagnifyingGlass from '../assets/magnifying-glass.svg'
import { useStyles } from '../style/styling';
import Film from '../assets/film-reel.svg';
import '../style/App.css';

//Generic placeholder page situations such as result not found or landing page
export function PlaceHolder(props) {
    const classes = useStyles()

    return (
        <div className={classes.columnBaseContainer}>
            <Box className={classes.columnBaseContainer_image}>
                <img className={classes.image} src={props.icon} alt="result icon" />
            </Box>
            <Box className={classes.columnBaseContainer_message}>
                {props.message}
            </Box>
        </div>
    );
}

//Loading page
export function Loading(props) {
    const classes = useStyles()

    return (
        <div className={classes.columnBaseContainer}>
            <Box className={classes.columnBaseContainer_image}>
                <img className={classes.image} id="spinner" src={Film} alt="film image" />
            </Box>
            <Box className={classes.columnBaseContainer_message} style={{ marginTop: "2rem" }}>
                <Typography variant="h2">{props.message}</Typography>
            </Box>
        </div>
    );
}

export default PlaceHolder