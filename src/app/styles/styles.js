import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    bodyWrapper: {
        backgroundColor: theme.palette.grey[200],
        minHeight: "100vh"
    },
    gridItemGrow: {
        flexGrow: 1
    },
    main: {
        flexGrow: 1,
        [theme.breakpoints.down("xs")]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    prodSignInText: {
        color: theme.palette.primary.main
    }
}));
