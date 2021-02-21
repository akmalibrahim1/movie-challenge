import * as api from '../util/omdb';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Box } from '@material-ui/core';
import DisplayGrid from '../components/displayGrid'
import {PlaceHolder, Loading} from '../components/placeholder'
import Sad from '../assets/sad.svg'

const maxNumberOfPages = 6; //each page of api call is 10 results long
const message = "Sorry we could not find anything matching your search for: "
export function SearchResults(props) {
    // var classes = useStyles()
    const { searchValue } = props.location.state
    const [searchResult, setSearchResult] = React.useState(null);
    const [isFound, setIsFound] = React.useState(false);
    const [isSpinning, setIsSpinng] = React.useState(true);
    React.useEffect(() => {
        const fetchResults = async () => {
            setIsSpinng(true)
            var response = []
            var firstPage = await api.searchMovieAndSeries(searchValue, 1)
            if (firstPage.Response != "False") {
                //determine the number of pages we will need 
                var totalPages = (firstPage.totalResults % maxNumberOfPages == 0) || firstPage.totalResults < 10 ? 1 : ((firstPage.totalResults / maxNumberOfPages) + 1)
                totalPages = totalPages > maxNumberOfPages ? maxNumberOfPages : totalPages

                //Build list of results
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
                !isSpinning && !isFound && <PlaceHolder message={message + searchValue} icon={Sad}></PlaceHolder>
            }
            {
                isSpinning && <Loading message="Searching..."/>
            }
        </div>
    );
}