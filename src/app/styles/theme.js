import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            // main: "#556cd6"
            main: "#3a65b8"
        },
        secondary: {
            main: "#f50057"
        },
        error: {
            main: red.A400
        },
        background: {
            default: "#fff"
        },
        star: {
            default: "#ffc107"
        }
    }
});

export default theme;
