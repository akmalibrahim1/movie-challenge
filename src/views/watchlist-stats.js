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
    const isFullScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const genreBreakdown = watchlist.genreBreakdown()
    const runTimeBreakdown = watchlist.runtimeBreakdown()
    const directorBreakdown = watchlist.directorBreakdown()
    const ratingBreakdown = watchlist.ratingsBreakdown()
    var genreDisplay = []
    var runtimeDisplay = []
    var directorDisplay = []
    var ratingDisplay = []
    const generateListBreakdown = (itemsList, resultsList) => {
        var index = 0
        for (const [key, value] of Object.entries(itemsList)) {
            if (index > 4) {
                break;
            }
            resultsList.push(
                (<li key={index}><span>{key}</span></li>)
            )
            index++
        }
    }
    const generateAggregateBreakdowns = (itemsList, resultsList) => {
        var index = 0
        for (const [key, value] of Object.entries(itemsList)) {
            if (index > 4) {
                break;
            }
            resultsList.push(
                (<li key={index}><span>{key}: {value}</span></li>)
            )
            index++
        }
    }
    generateListBreakdown(genreBreakdown, genreDisplay)
    generateListBreakdown(directorBreakdown, directorDisplay)
    generateAggregateBreakdowns(runTimeBreakdown, runtimeDisplay)
    generateAggregateBreakdowns(ratingBreakdown, ratingDisplay)
    return (
        <div style={{ "flexGrow": 1, "marginTop": "1rem" }}>
            { 
                isFullScreen && <Grid container className={classes.gridItemSizing} spacing={4}>
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