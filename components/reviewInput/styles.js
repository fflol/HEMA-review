import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    star: {
        top: theme.spacing(1),
        fontSize: "1rem",
        position: "relative",
        color: theme.palette.star.default
    },
    starEditing: {}
}));
