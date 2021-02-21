import React from 'react'
import { DisplayCard } from "./card";
import { Grid } from '@material-ui/core';
import { useStyles } from '../style/styling';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

function DisplayGrid(props) {
    const classes = useStyles()
    const theme = useTheme();

    //used to determine if the screen size is over 600px
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    //size of each item in a row (3 or 12 columns long)
    const initialState = matches ? 3 : 12

    //state value that will be used in the gui to dynamically update column size
    const [itemsPerRow, setItemsPerRow] = React.useState(initialState)

    //Update column size when screen size changes
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