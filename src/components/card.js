import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Box, CardActionArea, Container, IconButton, Paper } from '@material-ui/core';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';

const useStyles = makeStyles({
  root: {
    marginBottom: 12,
    height: "100%",
    width: "100%"
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    height: "100%",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%"
  },
  cardText: {
    justifyContent: "flex-end"
  }
});

export function DisplayCard(props) {
  const classes = useStyles();

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

