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
    },
    prodRatingText: {
        position: "relative",
        left: theme.spacing(1),
        top: -3
    },
    prodPrice: {
        position: "relative",
        top: -12,
        left: 4
    },
    prodDescription: {
        whiteSpace: "pre-wrap"
    },
    prodGridList: {
        flexWrap: "nowrap",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: "translateZ(0)"
    }
}));
