import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    price: {
        position: "relative",
        top: -12,
        left: 4
    },
    description: {
        display: "-webkit-box",
        ["-webkit-line-clamp"]: 3,
        ["-webkit-box-orient"]: "vertical",
        overflow: "hidden"
    },
    img: {
        maxWidth: 100,
        marginRight: theme.spacing(2)
    }
}));
