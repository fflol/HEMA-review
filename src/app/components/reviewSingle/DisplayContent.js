import React, { useState } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Rating from "@material-ui/lab/Rating";

import { useStyles } from "./styles";
import EditDropMenu from "./EditDropMenu";

//
// component
const DisplayContent = ({
    review,
    timeReviewed,
    isOwnReview,
    handleEditOpen,
    handleDelete
}) => {
    const classes = useStyles();

    // vars
    const author = review.user;
    const text = review.text;
    const rating = review.rating;

    return (
        <ListItem alignItems="flex-start" divider className={classes.listItem}>
            <ListItemAvatar>
                {author.photoURL ? (
                    <Avatar alt="author photo" src={author.photoURL} />
                ) : (
                    <AccountCircleIcon className={classes.accountCircleIcon} />
                )}
            </ListItemAvatar>
            <ListItemText
                disableTypography
                primary={
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
                        <Grid item>
                            <div>
                                <Rating
                                    name="rating"
                                    value={rating}
                                    size="small"
                                    readOnly
                                />
                            </div>
                            {isOwnReview && (
                                <EditDropMenu
                                    handleEditOpen={handleEditOpen}
                                    handleDelete={handleDelete}
                                />
                            )}
                        </Grid>
                    </Grid>
                }
                secondary={
                    <>
                        <Typography variant="body2">{text}</Typography>
                    </>
                }
            />
        </ListItem>
    );
};

DisplayContent.propTypes = {
    review: PropTypes.shape({
        id: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        timeReviewed: PropTypes.shape({}).isRequired,
        user: PropTypes.shape({
            displayName: PropTypes.string,
            email: PropTypes.string.isRequired,
            photoURL: PropTypes.string,
            uid: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    timeReviewed: PropTypes.string.isRequired,
    isOwnReview: PropTypes.bool,
    handleEditOpen: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default DisplayContent;
