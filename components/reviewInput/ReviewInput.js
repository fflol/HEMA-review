import React, { useState, useReducer, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import StarIcon from "@material-ui/icons/Star";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

import * as apiUtils from "../../firebase/firebaseApiUtils";
import * as actionCreators from "../../tools/actionCreators";
import * as reducers from "../../tools/reducer";
import { firebase } from "../../firebase/firebaseConfig";
import * as dbFormat from "../../tools/dbFormat";
import { userContext } from "../../tools/reactContext";
import { useStyles } from "./styles";

//
// component
const ReviewInput = ({ productID, reviewsDispatch }) => {
    const [textInput, setTextInput] = useState("");
    const [ratingInput, setRatingInput] = useState(1);

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
    const handleRatingChange = e => setRatingInput(e.target.value);
    const handleSubmit = async e => {
        e.preventDefault();
        await create();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box pb={2}>
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
            </Box>
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

ReviewInput.propTypes = {};

export default ReviewInput;
