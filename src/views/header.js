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
import { searchTypesList } from '../util/omdb'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontSize: 18
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '43%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '39ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    width: "100%",
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  iconSection: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },
  headerPadding: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '10%',
      marginRight: '10%',
      padding: 0
    }
  },
  headerFont: {
    fontSize: 14
  },
  desktopButton: {
    background: '#F5C745',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}));

function Header() {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [searchText, setSearchText] = React.useState("");

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
      <MenuItem>
        <IconButton
          aria-label="My movie watchlist"
          color="inherit"
        >
          <BookmarkIcon />
        </IconButton>
        <p>Watchlist</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <ShowChart />
        </IconButton>
        <p>Movie Stats</p>
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
              >
                <BookmarkIcon />
              Watchlist
            </Button>
              <Button aria-label="View your watchlist statistics" color="inherit">
                <ShowChart></ShowChart>
              Movie Stats
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
