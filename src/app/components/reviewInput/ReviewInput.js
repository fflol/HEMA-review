import React, { useState, useReducer, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";

import * as apiUtils from "../../firebase/firebaseApiUtils";
import * as actionCreators from "../../tools/useReduceHelpers/actionCreators";
import * as reducers from "../../tools/useReduceHelpers/reducer";
import * as dbFormat from "../../tools/formats/dbFormat";
import { firebase } from "../../firebase/firebaseConfig";
import { userContext } from "../../tools/reactContext";
import { ratingLabels } from "../../tools/commonVars";
import { useStyles } from "./styles";

//
// component
const ReviewInput = ({ productID, reviewsDispatch }) => {
    const [textInput, setTextInput] = useState("");
    const [ratingInput, setRatingInput] = useState(1);
    const [hoverValue, setHoverValue] = useState(-1); // rating label value

    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    const userLogged = useContext(userContext);

    const classes = useStyles();

    // CRUD
    const create = async () => {
        const userRef = firebase
            .firestore()
            .collection("users")
            .doc(userLogged.uid);

        const userObj = {
            uid: userLogged.uid,
            email: userLogged.email,
            photoURL: userLogged.photoURL,
            ...(userLogged.displayName && {
                displayName: userLogged.displayName
            })
        };

        const newReview = dbFormat.createReview(
            ratingInput,
            textInput,
            userObj,
            userRef
        );

        const newLocalReview = dbFormat.createReview(
            ratingInput,
            textInput,
            userObj
        );

        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .addReview(productID, newReview)
            .then(id => {
                actionCreators.createReviewSuccess(apiDispatch);
                toast.success("review post succeed");
                setTextInput("");
                setRatingInput("");
                actionCreators.createReviewSuccess(reviewsDispatch, {
                    ...newLocalReview,
                    id
                });
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                throw err;
            });
    };

    // handlers
    const handleTextChange = e => setTextInput(e.target.value);
    const handleRatingChange = (e, newValue) => setRatingInput(newValue);
    const handleSubmit = async e => {
        e.preventDefault();
        await create();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="flex-end">
                {ratingInput !== null && (
                    <Box mr={2} component="span">
                        {
                            ratingLabels[
                                hoverValue !== -1 ? hoverValue : ratingInput
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
            <Box pb={2}>
                <TextField
                    multiline
                    fullWidth
                    required
                    rows="4"
                    rowsMax="8"
                    placeholder="put your review here..."
                    value={textInput}
                    onChange={handleTextChange}
                    variant="filled"
                    className={classes.textField}
                />
            </Box>
            <Box pb={3}>
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
            </Box>
            <Divider />
        </form>
    );
};

ReviewInput.propTypes = {
    productID: PropTypes.string.isRequired,
    reviewsDispatch: PropTypes.func.isRequired
};

export default ReviewInput;
