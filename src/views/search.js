import * as api from '../util/omdb';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Box } from '@material-ui/core';
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
            //determine the number of pages we will need 
            var totalPages= (firstPage.totalResults % maxNumberOfPages == 0) || firstPage.totalResults < 10 ? 1 : ((firstPage.totalResults/maxNumberOfPages) + 1)
            totalPages = totalPages > maxNumberOfPages ? maxNumberOfPages : totalPages

            //Build list of results
            response = response.concat(firstPage.Search)
            for (var i = 2; i <= totalPages; i++) {
                var tempPage = await api.searchMovieAndSeries(searchValue, i)
                if(tempPage.Response === "True") {
                    response = response.concat(tempPage.Search)
                }
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