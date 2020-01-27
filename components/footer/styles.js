import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(0, 2),
        marginTop: "auto",
        backgroundColor:
            theme.palette.type === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[200]
    }
}));
