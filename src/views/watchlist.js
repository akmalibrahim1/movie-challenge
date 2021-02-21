import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import * as watchlist from '../util/watchlist-util'
import DisplayGrid from '../components/displayGrid'
import { useStyles } from '../style/styling';

//Creates the panels used to by the tabs
function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function Watchlist() {
  const classes = useStyles();

  //Gets the initial watchlist items sorted by All, Movies and Series 
  const initialAllWatchList = watchlist.getWishlistItems(watchlist.TYPES.all)
  const initialMoviesWatchList = watchlist.getWishlistItems(watchlist.TYPES.movies)
  const initialSeriesWatchList = watchlist.getWishlistItems(watchlist.TYPES.series)

  //used to switch between the different tabs
  const [value, setValue] = React.useState(0);

  //store the watchlist items into state values to be used by the UI and can be updated dynamically through callback
  const [allWatchlist, setAllWatchlist] = React.useState(initialAllWatchList)
  const [moviesWatchlist, setMoviesWatchlist] = React.useState(initialMoviesWatchList)
  const [seriesWatchlist, setSeriesWatchlist] = React.useState(initialSeriesWatchList)

  //value used by the update hook to determine if we need to update the watchlist
  const [isUpdated, setIsUpdated] = React.useState(false)

  //Method used to update the tab changes
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Run the watchlist updates if the isUpdated flag has been changed to true
  React.useEffect(() => {
    if (isUpdated) {
      setAllWatchlist(watchlist.getWishlistItems(watchlist.TYPES.all))
      setMoviesWatchlist(watchlist.getWishlistItems(watchlist.TYPES.movies))
      setSeriesWatchlist(watchlist.getWishlistItems(watchlist.TYPES.series))
      setIsUpdated(false)
    }
  }, [isUpdated])



  return (
    <div className={classes.watchlist}>
      <Tabs value={value} onChange={handleChange} className={classes.watchListTabs} aria-label="main tabs panel">
        <Tab label="All" id="all-tab" aria-controls="all-tabpanel" />
        <Tab label="Movies" id="movies-tab" aria-controls="movies-tabpanel" />
        <Tab label="Series" id="series-tab" aria-controls="series-tabpanel" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DisplayGrid changeCallback={setIsUpdated} itemsToDisplay={allWatchlist} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DisplayGrid changeCallback={setIsUpdated} itemsToDisplay={moviesWatchlist} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DisplayGrid changeCallback={setIsUpdated} itemsToDisplay={seriesWatchlist} />
      </TabPanel>
    </div>
  );
}
