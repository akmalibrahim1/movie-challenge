import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
        [theme.breakpoints.up('sm')]: {
            width: '39ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
        width: "100%",
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    iconSection: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    headerPadding: {
        [theme.breakpoints.up('sm')]: {
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
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    gridItemSizing: {
        flexGrow: 1,
        height: "100%",
        width: "100%"
    },
    control: {
        padding: theme.spacing(2),
    },
    paper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexFlow: "column"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    imageDetails: {
        width: "60%",
        height: "100%"
    },
    icon: {
        width: "45%",
        height: "100%",
        marginTop: "1rem"
    },
    displayBottomRight: {
        display: 'flex',
        flexGrow: '1',
        justifyContent: 'flex-end',
        paddingBottom: '1rem',
        paddingRight: '1rem'
    },
    bottomRightButton: {
        background: '#F5C745',
        marginLeft: 'auto',
        marginTop: 'auto'
    },
    unstyledList: {
        listStyleType: 'none',
        paddingInlineStart: '0'
    },
    watchlist: {
        flexGrow: "1",
        backgroundColor: theme.palette.background.paper,
    },
    watchListTabs: {
        marginTop: "3.5rem",
        marginBottom: "2rem"
    },
    columnBaseContainer: {
        display: "flex",
        flexDirection: "column",
        marginTop: "15%"
    },
    columnBaseContainer_image: {
        width: "10rem",
        marginLeft: "auto",
        marginRight: "auto"
    },
    columnBaseContainer_message: {
        flexGrow: "1",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        marginTop: "1rem"
    },
    customCard_image: {
        display: "flex",
        flexGrow: "1",
        height: "50%",
        width: "100%",
        justifyContent: "center"
    },
    customCard_titleContainer: {
        display: "flex",
        height: "50%",
        width: "100%",
        justifyContent: "center"
    },
    customCard_titleText: {
        marginTop: "auto",
        paddingBottom: "2rem" 
    }
}));

export { useStyles };