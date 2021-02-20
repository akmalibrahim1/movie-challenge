import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShowChart from '@material-ui/icons/ShowChart';
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom';
import {useStyles} from '../style/styling';

function Header() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [searchText, setSearchText] = React.useState("");
  const classes = useStyles()
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value)
  }
  var history = useHistory()
  const doSearch = () => {
    history.push({
      pathname: '/searchresults',
      state: {
        searchValue: searchText
      }
    })
  }

  const handleKeyPress = (event) => {
    if(event.key == "Enter"){
      doSearch();
    }
  }

  const displayWatchlist = () => {
    history.push({
      pathname: '/watchlist',
    })
  }

  const displayWatchlistStats = () => {
    history.push({
      pathname: '/watchliststats',
    })
  }

  const menuId = 'primary-navigation';

  const mobileMenuId = 'primary-navigation-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem aria-label="My watchlist" onClick={displayWatchlist}>
          <BookmarkIcon />
        <p>Watchlist</p>
      </MenuItem>
      <MenuItem aria-label="My watchlist statistics" onClick={displayWatchlistStats}>
          <ShowChart />
        <p>Watchlist Stats</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.headerPadding}>
          <span>
            <Typography className={classes.title} noWrap>
              Project Sunshine
            </Typography>
          </span>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={handleSearchTextChange}
              type="text"
              onKeyUp={handleKeyPress}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <Button style={{ 'background': '#F5C745' }} onClick={doSearch}>
              Search
              </Button>
            <div className={classes.iconSection}>
              <Button
                edge="end"
                aria-label="My watchlist"
                aria-controls={menuId}
                color="inherit"
                onClick={displayWatchlist}
              >
                <BookmarkIcon />
              Watchlist
            </Button>
              <Button
                edge="end"
                aria-label="View your watchlist statistics"
                aria-controls="navigate to watchlist statistics"
                color="inherit"
                onClick={displayWatchlistStats}>
                <ShowChart></ShowChart>
              Watchlist Stats
            </Button>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      { renderMobileMenu}
    </div >
  );
}

export default Header;
