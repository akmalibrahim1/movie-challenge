import * as api from '../util/omdb';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Box } from '@material-ui/core';
import DisplayGrid from '../components/displayGrid'
import { PlaceHolder, Loading } from '../components/placeholder'
import Sad from '../assets/sad.svg'

const maxNumberOfPages = 6; //each page of api call is 10 results long
const message = "Sorry we could not find anything matching your search for: " //message for when no results could be found
export function SearchResults(props) {
    // var classes = useStyles()
    const { searchValue } = props.location.state

    //use for storing the actual UI grid with the results
    const [searchResult, setSearchResult] = React.useState(null);

    //use to indicate if we have found anything in the search
    const [isFound, setIsFound] = React.useState(false);

    //use to indicate if we need to display the spinner UI
    const [isSpinning, setIsSpinng] = React.useState(true);

    //Triggered everytime a new search value is entered in
    React.useEffect(() => {
        const fetchResults = async () => {
            setIsSpinng(true)
            var response = []
            var firstPage = await api.searchMovieAndSeries(searchValue, 1)

            //After querying the first page check if we have retrieve a response or not
            if (firstPage.Response != "False") {

                //determine the number of pages we will need from the api
                //max amount of queried pages will be 6 (1 page = 10 results)
                var totalPages = (firstPage.totalResults % maxNumberOfPages == 0) || firstPage.totalResults < 10 ? 1 : ((firstPage.totalResults / maxNumberOfPages) + 1)
                totalPages = totalPages > maxNumberOfPages ? maxNumberOfPages : totalPages

                //Retrieve the results from each api call and combine it into a single list
                response = response.concat(firstPage.Search)
                for (var i = 2; i <= totalPages; i++) {
                    var tempPage = await api.searchMovieAndSeries(searchValue, i)
                    if (tempPage.Response === "True") {
                        response = response.concat(tempPage.Search)
                    }
                }
                const results = < DisplayGrid itemsToDisplay={response} />
                setSearchResult(results);
                setIsFound(true)
            } else {
                setIsFound(false)
            }
            setIsSpinng(false)
        };
        fetchResults();
    }, [searchValue])

    return (
        <div>
            {
                //Display only when loading has finished and if results are found
                !isSpinning && isFound && <div style={{ "flexGrow": 1 }}>
                    <Box style={{ "marginTop": "1rem", "marginBottom": "1rem" }}>
                        <Typography variant="h5">
                            Search Result for <span style={{ "fontStyle": "italic", "textDecorationLine": "underline" }}>{searchValue}</span>
                        </Typography>
                    </Box>
                    {searchResult}
                </div>
            }
            {
                //Display only when loading has finished and if results are not found
                !isSpinning && !isFound && <PlaceHolder message={message + searchValue} icon={Sad}></PlaceHolder>
            }
            {
                //Display only when loading results
                isSpinning && <Loading message="Searching..." />
            }
        </div>
    );
}