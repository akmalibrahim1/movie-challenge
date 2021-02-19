import { DisplayCard } from '../components/card';
import * as api from '../util/omdb';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Grid, Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles } from '../style/styling';
import DisplayGrid from '../components/displayGrid'

const maxNumberOfPages = 6; //each page of api call is 10 results long

export function SearchResults(props) {
    // var classes = useStyles()
    const { searchValue } = props.location.state
    const [searchResult, setSearchResult] = React.useState(null);
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
            const results = < DisplayGrid itemsToDisplay={response} />       
            setSearchResult(results);
        };
        fetchResults();
    }, [searchValue])

    return (
        <div style={{ "flexGrow": 1 }}>
            <Box style={{ "marginTop": "1rem", "marginBottom": "1rem" }}>
                <Typography variant="h5">
                    Search Result for <span style={{ "fontStyle": "italic", "textDecorationLine": "underline" }}>{searchValue}</span>
                </Typography>
            </Box>
            {searchResult}
        </div>
    );
}