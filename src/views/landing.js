import React from 'react';
import MagnifyingGlass from '../assets/magnifying-glass.svg'
import PlaceHolder from '../components/placeholder'

function LandingPage() {
    const message = "Start building your watchlist by entering your movie/show in the search bar and hit search"
    return (
        <PlaceHolder message={message} icon={MagnifyingGlass}></PlaceHolder>
    );
}

export default LandingPage