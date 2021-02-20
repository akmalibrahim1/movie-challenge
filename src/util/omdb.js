const dataRequests = "http://www.omdbapi.com/?apikey="+ process.env.REACT_APP_API_KEY +"&"
const posterRequest= "http://img.omdbapi.com/?apikey="+ process.env.REACT_APP_API_KEY +"&"
const imdbLink= "https://www.imdb.com/title/"
const axios = require("axios")

//General api promise call 
function makeOmdbCall(url){
    return new Promise(function (resolve, reject) { 
        axios.get(url).then( 
            (response) => { 
                var result = response.data; 
                resolve(result); 
            }, 
                (error) => { 
                reject(error); 
            } 
        ); 
    });
}

export const searchTypesList = ["All", "Movie", "Series"]

//Retrieve movie by name
export function searchMovieByName(movieName){
    return makeOmdbCall(dataRequests + "t=" +movieName)
}

//Retrieve movie by imdbID
export function searchById(movieId){
    return makeOmdbCall(dataRequests + "i=" +movieId)
}

//Retrieve the results for a list of movies/shows (paginated)
export function searchMovieAndSeries(title, pageNumber){
    return makeOmdbCall(dataRequests + "s=" + title + "&page=" + pageNumber)
}

export function getImdbLink(id){
    return imdbLink + id
}
