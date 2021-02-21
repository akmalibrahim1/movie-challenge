import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import Header from './views/header';
import Footer from './views/footer';
import { Box } from '@material-ui/core';
import Watchlist from './views/watchlist'
import theme from './style/theme';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { SearchResults } from './views/search'
import { WatchlistStats } from './views/watchlist-stats'
import  LandingPage  from './views/landing'

require("dotenv").config() 

//Main index page which hooks all the react components to the main index page 
// Uses routes to determine what page needs to be rendered.
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Box marginLeft="10%" marginRight="10%">
          <Switch>
          <Route exact path="/" render={() => { return <Redirect to="/home" />}}/>
            <Route path="/home" component={LandingPage}/>
            <Route path="/watchlist" component={Watchlist}/>
            <Route path="/searchresults" component={SearchResults}/>
            <Route path="/watchliststats" component={WatchlistStats}/>
          </Switch>
        </Box>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
