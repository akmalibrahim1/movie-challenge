import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import Header from './views/header';
import Footer from './views/footer';
import { Box } from '@material-ui/core';
import Watchlist from './views/watchlist'
import theme from './style/theme';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { SearchResults } from './views/search'
require("dotenv").config() 

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Box marginLeft="10%" marginRight="10%">
          <Switch>
            <Route path="/watchlist" component={Watchlist}/>
            <Route path="/searchresults" component={SearchResults}/>
          </Switch>
        </Box>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
