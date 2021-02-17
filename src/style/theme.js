import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: "#408EA8",
            light: "#51CCF5"
        }, // Purple and green play nicely together.
        secondary: {
            main: "#4A1EA8",
            light: "#7438F5"
        }
    },
    overrides: {
        MuiTypography: {
            h2:{
                fontSize: 16
            }
        }
    }
});

export default Theme;
