import { DisplayCard } from '../components/card';
import * as api from '../util/omdb';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const maxNumberOfPages = 6; //each page of api call is 10 results long
const resultsToDisplay = 4; //how many results to display per row

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "100%",
        width: "100%"
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export function SearchResults(props) {
    var classes = useStyles()
    const { searchValue } = props.location.state
    const [searchResult, setSearchResult] = React.useState(null);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const checkScreenSize = () => {
        if (matches) {
            return 3
        } else {
            return 12
        }
    }
    React.useEffect(() => {
        const fetchResults = async () => {
            var response = []
            var firstPage = await api.searchMovieAndSeries(searchValue, 1)
            //determine the number of rows we will need 
            var totalRows = firstPage.totalResults % maxNumberOfPages == 0 ? firstPage.totalResults : (firstPage.totalResults + 1)
            totalRows = totalRows > maxNumberOfPages ? maxNumberOfPages : totalRows

            //Build list of results
            response = response.concat(firstPage.Search)
            for (var i = 2; i <= totalRows; i++) {
                var tempPage = await api.searchMovieAndSeries(searchValue, i)
                response = response.concat(tempPage.Search)
            }
            const listOfResults = []
            //Create the results page
            for (var i = 0; i < response.length; i++) {

                //create the group to be used in a row of results
                var group = []
                const groupLimit = i + resultsToDisplay
                for (i; i < groupLimit; i++) {
                    if (i >= response.length) {
                        break;
                    }
                    group.push(response[i])
                }
                if (group.length != 0) {
                    var value = group.map((result, index) => (
                        <Grid key={index} item xs={checkScreenSize()}>
                            <DisplayCard movie={result} key={result.imdbID} poster={result.Poster}
                                title={result.Title} year={result.Year} plot={result.Plot} />
                        </Grid>
                    ))
                    listOfResults.push(value)
                }
            }
            const results = (
                <Grid container className={classes.root} spacing={4}>
                    {listOfResults}
                </Grid>
            )
            // const results = response.map(function (result, index) {
            //     console.log(JSON.stringify(result))
            //     return <DisplayCard movie={result} key={result.imdbID} poster={result.Poster}
            //         title={result.Title} year={result.Year} plot={result.Plot} />
            // })
            setSearchResult(results);
        };
        fetchResults();
    }, [searchValue, matches])

    return (
        <div style={{ "flexGrow": 1 }}>
            <Typography variant="h5">
                Search Result for {searchValue}
            </Typography>
            {searchResult}
        </div>
    );
}