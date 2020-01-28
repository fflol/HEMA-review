import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    inline: {
        display: "inline"
    },
    star: {
        fontSize: "1rem",
        position: "relative",
        top: "2px",
        color: theme.palette.star.default
    }
}));
