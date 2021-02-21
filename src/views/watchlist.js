import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import * as watchlist from '../util/watchlist-util'
import DisplayGrid from '../components/displayGrid'

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Watchlist() {
  const classes = useStyles();
  const initialAllWatchList = watchlist.getWishlistItems(watchlist.TYPES.all)
  const initialMoviesWatchList = watchlist.getWishlistItems(watchlist.TYPES.movies)
  const initialSeriesWatchList = watchlist.getWishlistItems(watchlist.TYPES.series)
  const [value, setValue] = React.useState(0);
  const [allWatchlist, setAllWatchlist] = React.useState(initialAllWatchList)
  const [moviesWatchlist, setMoviesWatchlist] = React.useState(initialMoviesWatchList)
  const [seriesWatchlist, setSeriesWatchlist] = React.useState(initialSeriesWatchList)
  const [isUpdated, setIsUpdated] = React.useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (isUpdated) {
      setAllWatchlist(watchlist.getWishlistItems(watchlist.TYPES.all))
      setMoviesWatchlist(watchlist.getWishlistItems(watchlist.TYPES.movies))
      setSeriesWatchlist(watchlist.getWishlistItems(watchlist.TYPES.series))
      setIsUpdated(false)
    }
  }, [isUpdated])



  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange} style={{ "marginTop": "3.5rem", "marginBottom": "2rem" }} aria-label="simple tabs example">
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
