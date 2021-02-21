import React from 'react';
import { CustomCard } from "../components/card";
import * as watchlist from '../util/watchlist-util'
import { Grid } from '@material-ui/core';
import { useStyles } from '../style/styling';
import MasksIcon from '../assets/masks.svg'
import StarIcon from '../assets/star.svg'
import StopwatchIcon from '../assets/stopwatch.svg'
import DirectorIcon from '../assets/director-chair.svg'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export function WatchlistStats(props) {
    const theme = useTheme();
    const classes = useStyles();

    //used to determine if the screen size exceeds 600px
    const isFullScreen = useMediaQuery(theme.breakpoints.up('sm'));

    //Retrieves the information about your watchlist (Favorite Genre, Favorite Director, Averate runtime, Average rating)
    const genreBreakdown = watchlist.genreBreakdown()
    const runTimeBreakdown = watchlist.runtimeBreakdown()
    const directorBreakdown = watchlist.directorBreakdown()
    const ratingBreakdown = watchlist.ratingsBreakdown()

    //Hold the UI objects that will be displayed for each category abopve
    var genreDisplay = []
    var runtimeDisplay = []
    var directorDisplay = []
    var ratingDisplay = []
    
    //Generate a list of the top 5 of a given category i.e. Top 5 genre
    const generateListBreakdown = (itemsList, resultsList, additionalMessage) => {
        var index = 0
        for (const [key, value] of Object.entries(itemsList)) {
            if (index > 4) {
                break;
            }
            resultsList.push(
                (<li key={index}><span>{key} {additionalMessage}</span></li>)
            )
            index++
        }
    }

    //Generate a list of aggregated information
    const generateAggregateBreakdowns = (itemsList, resultsList, additionalMessage) => {
        var index = 0
        for (const [key, value] of Object.entries(itemsList)) {
            if (index > 4) {
                break;
            }
            resultsList.push(
                (<li key={index}><span>{key}: {value}{additionalMessage}</span></li>)
            )
            index++
        }
    }
    generateListBreakdown(genreBreakdown, genreDisplay)
    generateListBreakdown(directorBreakdown, directorDisplay)
    generateAggregateBreakdowns(runTimeBreakdown, runtimeDisplay, " min")
    generateAggregateBreakdowns(ratingBreakdown, ratingDisplay, "/10")
    return (
        <div style={{ "flexGrow": 1, "marginTop": "1rem" }}>
            { 
                //Display only when screen is above 600px
                isFullScreen && <Grid container className={classes.gridItemSizing} spacing={4}>
                    {/** uses empty grid to format the page, alternative would be use full size grid and resize/padd contents to desired location */}
                    <Grid item xs={3} />
                    <Grid item xs={3}>
                        <CustomCard title="Favorite Genres" image={MasksIcon} imagealt="Image of tragedy/comedy masks">
                            <ol>
                                {genreDisplay}
                            </ol>
                        </CustomCard>
                    </Grid>
                    <Grid item xs={3}>
                        <CustomCard title="Favorite Directors" image={DirectorIcon} imagealt="Image of director chair">
                            <ol>
                                {directorDisplay}
                            </ol>
                        </CustomCard>
                    </Grid>
                    <Grid item xs={3} />
                    <Grid item xs={3} />
                    <Grid item xs={3}>
                        <CustomCard title="Runtime Statistics" image={StopwatchIcon} imagealt="Image of a stopwatch">
                            {runtimeDisplay}
                        </CustomCard>
                    </Grid>
                    <Grid item xs={3}>
                        <CustomCard title="Rating Statistics" image={StarIcon} imagealt="Image of a star">
                            {ratingDisplay}
                        </CustomCard>
                    </Grid>
                    <Grid item xs={3} />
                </Grid>
            }
            { 
                //Display only when screen is below 600px
                !isFullScreen && <Grid container className={classes.gridItemSizing} spacing={4}>
                    <Grid item xs={12}>
                        <CustomCard title="Favorite Genres" image={MasksIcon} imagealt="Image of tragedy/comedy masks">
                            <ol>
                                {genreDisplay}
                            </ol>
                        </CustomCard>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomCard title="Favorite Directors" image={DirectorIcon} imagealt="Image of director chair">
                            <ol>
                                {directorDisplay}
                            </ol>
                        </CustomCard>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomCard title="Runtime Statistics" image={StopwatchIcon} imagealt="Image of a stopwatch">
                            {runtimeDisplay}
                        </CustomCard>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomCard title="Rating Statistics" image={StarIcon} imagealt="Image of a star">
                            {ratingDisplay}
                        </CustomCard>
                    </Grid>
                </Grid>
            }
        </div>
    );
}