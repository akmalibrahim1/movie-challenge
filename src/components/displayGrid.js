import React from 'react'
import { DisplayCard } from "./card";
import { Grid } from '@material-ui/core';
import { useStyles } from '../style/styling';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

function DisplayGrid(props) {
    const classes = useStyles()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const initialState = matches ? 3 : 12
    const [itemsPerRow, setItemsPerRow] = React.useState(initialState)
    React.useEffect(() => {
        const checkScreenSize = () => {
            if (matches) {
                return 3
            } else {
                return 12
            }
        }
        setItemsPerRow(checkScreenSize)
    }, [matches])

    const results = (
        <Grid container className={classes.gridItemSizing} spacing={4}>
            {
                props.itemsToDisplay.map((result, index) => (
                    <Grid key={index} item xs={itemsPerRow}>
                        <DisplayCard changeCallback={props.changeCallback} imdbId={result.imdbID} poster={result.Poster}
                            title={result.Title} year={result.Year} plot={result.Plot} />
                    </Grid>
                ))
            }
        </Grid>
    )
    return results;
}

export default DisplayGrid;