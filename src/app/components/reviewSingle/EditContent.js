import React, { useState } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ClearIcon from "@material-ui/icons/Clear";
import Rating from "@material-ui/lab/Rating";

import { ratingLabels } from "../../tools/commonVars";
import { ConfirmDialog } from "../../components/utilComponents";
import { useStyles } from "./styles";

//
// component
const EditContent = ({
    author,
    timeReviewed,
    apiStatus,
    ratingInput,
    handleRatingChange,
    textInput,
    handleTextChange,
    handleSubmitEdit,
    handleCancel
}) => {
    const [hoverValue, setHoverValue] = useState(-1); // rating label value
    const [dialogOpen, setDialogOpen] = useState(false);

    const classes = useStyles();

    //handlers
    const handleDialogOpen = e => {
        e.preventDefault();
        setDialogOpen(true);
    };
    const handleDialogClose = () => setDialogOpen(false);

    return (
        <>
            <ListItem
                alignItems="flex-start"
                divider
                className={classes.listItem}
            >
                <ListItemAvatar>
                    {author.photoURL ? (
                        <AccountCircleIcon />
                    ) : (
                        <Avatar alt="author photo" src={author.photoURL} />
                    )}
                </ListItemAvatar>
                <ListItemText
                    disableTypography
                    primary={
                        <Card elevation={0} square>
                            <CardHeader
                                action={
                                    <IconButton
                                        onClick={handleCancel}
                                        size="small"
                                        aria-label="settings"
                                        className={classes.cardHeaderButton}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                }
                                title={
                                    <Typography variant="button">
                                        Edit review
                                    </Typography>
                                }
                                className={classes.cardHeader}
                            />
                            <Grid
                                container
                                justify="space-between"
                                className={classes.primaryListItem}
                            >
                                <Grid item>
                                    <Typography
                                        component="h5"
                                        variant="subtitle2"
                                        color="textPrimary"
                                    >
                                        {author.displayName
                                            ? author.displayName
                                            : author.email}
                                    </Typography>
                                    <Typography
                                        component="h6"
                                        variant="caption"
                                        color="textPrimary"
                                    >
                                        {timeReviewed}
                                    </Typography>
                                </Grid>
                                <Grid container justify="flex-end">
                                    {ratingInput !== null && (
                                        <Box mr={2}>
                                            {
                                                ratingLabels[
                                                    hoverValue !== -1
                                                        ? hoverValue
                                                        : ratingInput
                                                ]
                                            }
                                        </Box>
                                    )}
                                    <Rating
                                        name="edit-rating"
                                        size="small"
                                        value={ratingInput}
                                        onChange={handleRatingChange}
                                        onChangeActive={(event, newHover) => {
                                            setHoverValue(newHover);
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    }
                    secondary={
                        <form onSubmit={handleDialogOpen}>
                            <TextField
                                required
                                multiline
                                fullWidth
                                rows="4"
                                rowsMax="8"
                                value={textInput}
                                onChange={handleTextChange}
                                variant="filled"
                                className={classes.textField}
                            />
                            <Button
                                type="submit"
                                size="small"
                                variant="contained"
                                color="primary"
                                disabled={apiStatus ? true : false}
                                disableElevation
                                fullWidth
                            >
                                {apiStatus ? "submiting" : "submit"}
                            </Button>
                        </form>
                    }
                />
            </ListItem>
            <ConfirmDialog
                open={dialogOpen}
                handleClose={handleDialogClose}
                text="Previous content will be overwritten, confirm edit?"
                action={handleSubmitEdit}
            />
        </>
    );
};

EditContent.propTypes = {
    author: PropTypes.shape({
        displayName: PropTypes.string,
        email: PropTypes.string.isRequired,
        photoURL: PropTypes.string,
        uid: PropTypes.string.isRequired
    }).isRequired,
    timeReviewed: PropTypes.string.isRequired,
    apiStatus: PropTypes.number.isRequired,
    ratingInput: PropTypes.number.isRequired,
    handleRatingChange: PropTypes.func.isRequired,
    textInput: PropTypes.string.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    handleSubmitEdit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};

export default EditContent;
