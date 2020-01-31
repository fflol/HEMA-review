import { fade } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    logoContainer: {
        whiteSpace: "nowrap"
    },
    logo: {
        height: 30,
        paddingRight: theme.spacing(1),
        position: "relative",
        top: 3
    },
    logoText: {
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    },
    grow: {
        flexGrow: 1
    },
    loggedIn: {
        color: theme.palette.common.white
    },
    avatarSize: {
        height: theme.spacing(4),
        width: theme.spacing(4)
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto"
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: 200
        }
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    loginDialog: {
        padding: theme.spacing(3)
    },
    marginBottom: {
        marginBottom: theme.spacing(2)
    },
    buttonWrap: {
        whiteSpace: "nowrap"
    },
    menuPaper: {
        padding: theme.spacing(1)
    }
}));
