export const TYPES = { movies: "movie", series: "series", episodes: "episodes", all: "all" }

export function getWishlistItems(type) {
    const storedItems = Object.keys(localStorage)
    var wishlist = []
    for (var i = 0; i < storedItems.length; i++) {
        const jsonString = localStorage.getItem(storedItems[i])
        const result = JSON.parse(jsonString)
        if ((type === result.Type || type === TYPES.all) && result.Type != undefined) {
            wishlist.push(result)
        }
    }
    return wishlist
}

export function genreBreakdown() {
    const storedItems = Object.keys(localStorage)
    var genreList = []
    for (var i = 0; i < storedItems.length; i++) {
        const jsonString = localStorage.getItem(storedItems[i])
        const data = JSON.parse(jsonString)
        if (data.Type != undefined) {
            const genre = data.Genre.split(",")
            for (var j = 0; j < genre.length; j++) {
                if (genreList[genre[j].trim()] === undefined) {
                    genreList[genre[j].trim()] = 1
                } else {
                    genreList[genre[j].trim()] = genreList[genre[j].trim()] + 1
                }
            }
        }
    }
    const genreSortedList = Object.fromEntries(
        Object.entries(genreList).sort(([, a], [, b]) => b - a)
    );
    console.log(genreSortedList)
    return genreSortedList
}

export function runtimeBreakdown() {
    const storedItems = Object.keys(localStorage)
    var runTimeObject = {
        longest: 0,
        shortest: 0,
        average: 0
    }
    var longestRuntime = 0
    var shortestRuntime = 999
    var accumulatedRuntime = 0
    var watchListLength = 0
    for (var i = 0; i < storedItems.length; i++) {
        const jsonString = localStorage.getItem(storedItems[i])
        const data = JSON.parse(jsonString)
        if (data.Type != undefined) {
            const runtime = parseInt(data.Runtime.split(" ")[0])
            accumulatedRuntime = accumulatedRuntime + runtime
            longestRuntime = longestRuntime < runtime ? runtime : longestRuntime
            shortestRuntime = shortestRuntime > runtime ? runtime : shortestRuntime
            watchListLength++
        }
    }
    runTimeObject.longest = longestRuntime
    runTimeObject.shortest = shortestRuntime
    runTimeObject.average = Math.round(accumulatedRuntime / watchListLength)
    console.log(runTimeObject)
    return runTimeObject
}

export function directorBreakdown() {
    const storedItems = Object.keys(localStorage)
    var directorList = []
    for (var i = 0; i < storedItems.length; i++) {
        const jsonString = localStorage.getItem(storedItems[i])
        const data = JSON.parse(jsonString)
        if (data.Type != undefined) {
            const directors = data.Director.split(",")
            for (var j = 0; j < directors.length; j++) {
                if (directors[j] !== "N/A") {
                    if (directorList[directors[j].trim()] === undefined) {
                        directorList[directors[j].trim()] = 1
                    } else {
                        directorList[directors[j].trim()] = directorList[directors[j].trim()] + 1
                    }
                }
            }
        }
    }
    const directorSortedList = Object.fromEntries(
        Object.entries(directorList).sort(([, a], [, b]) => b - a)
    );
    console.log(directorSortedList)
    return directorSortedList
}

export function ratingsBreakdown() {
    const storedItems = Object.keys(localStorage)
    var ratingObject = {
        Highest: 0,
        Lowest: 0,
        Average: 0
    }
    var highestRating = 0
    var lowestRating = 999.99
    var accumulatedRating = 0
    var watchListLength = 0
    for (var i = 0; i < storedItems.length; i++) {
        const jsonString = localStorage.getItem(storedItems[i])
        const data = JSON.parse(jsonString)
        if (data.Type != undefined && data.imdbRating != undefined) {
            const rating = parseFloat(data.imdbRating)
            accumulatedRating = accumulatedRating + rating
            highestRating = highestRating < rating ? rating : highestRating
            lowestRating = lowestRating > rating ? rating : lowestRating
            watchListLength++
        }
    }
    ratingObject.Highest = highestRating
    ratingObject.Lowest = lowestRating
    ratingObject.Average = (accumulatedRating / watchListLength).toFixed(1)
    console.log(ratingObject)
    return ratingObject
}