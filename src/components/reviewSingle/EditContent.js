import React from "react";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
import StarIcon from "@material-ui/icons/Star";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ClearIcon from "@material-ui/icons/Clear";

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
    const classes = useStyles();

    return (
        <ListItem alignItems="flex-start" divider className={classes.listItem}>
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
                            <Grid item>
                                <div>
                                    <StarIcon className={classes.star} />{" "}
                                    <FormControl required>
                                        <Select
                                            native
                                            value={ratingInput}
                                            onChange={handleRatingChange}
                                        >
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                }
                secondary={
                    <form onSubmit={handleSubmitEdit}>
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
    );
};

EditContent.propTypes = {
    author: PropTypes.object.isRequired,
    timeReviewed: PropTypes.string.isRequired,
    apiStatus: PropTypes.number.isRequired,
    ratingInput: PropTypes.string.isRequired,
    handleRatingChange: PropTypes.func.isRequired,
    textInput: PropTypes.string.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    handleSubmitEdit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};

export default EditContent;
