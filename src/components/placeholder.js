import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Box } from '@material-ui/core';
import MagnifyingGlass from '../assets/magnifying-glass.svg'
import { useStyles } from '../style/styling';
import Film from '../assets/film-reel.svg';
import '../style/App.css';

export function PlaceHolder(props) {
    const classes = useStyles()

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "15%" }}>
            <Box style={{ "width": "10rem", "marginLeft": "auto", "marginRight": "auto" }}>
                <img className={classes.image} src={props.icon} alt="result icon" />
            </Box>
            <Box style={{ "flexGrow": "1", "marginLeft": "auto", "marginRight": "auto", textAlign: "center", marginTop: "1rem" }}>
                {props.message}
            </Box>
        </div>
    );
}

export function Loading(props) {
    const classes = useStyles()

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "15%" }}>
            <Box style={{ "width": "10rem", "marginLeft": "auto", "marginRight": "auto" }}>
                <img className={classes.image} id="spinner" src={Film} alt="recipe thumbnail" />
            </Box>
            <Box style={{ "flexGrow": "1", "marginLeft": "auto", "marginRight": "auto", textAlign: "center", marginTop: "2rem" }}>
                <Typography variant="h2">{props.message}</Typography>
            </Box>
        </div>
    );
}

export default PlaceHolder