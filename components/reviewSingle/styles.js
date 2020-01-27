import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    listItem: {
        paddingLeft: 0,
        paddingRight: 0
    },
    star: {
        fontSize: "1rem",
        position: "relative",
        top: "2px",
        color: theme.palette.star.default
    },
    starEditing: {
        top: 5
    },
    rating: {
        marginRight: 28
    },
    primaryListItem: {
        marginBottom: theme.spacing(2)
    },
    cardHeader: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        padding: "0 0 0 12px"
    },
    cardHeaderButton: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: theme.palette.primary.contrastText
    },
    textField: {
        marginBottom: theme.spacing(2)
    },
    accountCircleIcon: {
        width: 40,
        height: 40
    }
}));
