import React, { useState, useReducer, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { firebase } from "../../firebase/firebaseConfig";
import * as apiUtils from "../../firebase/firebaseApiUtils";
import * as actionCreators from "../../tools/actionCreators";
import * as reducers from "../../tools/reducer";
import * as dbFormat from "../../tools/dbFormat";
import { userContext } from "../../tools/reactContext";
import { FbTimestampToReadable } from "../../tools/timeFormat";

//
// component
const ReviewSingle = ({ productID, review, reviewsDispatch }) => {
    const [isEditing, setIsEditing] = useState(false); // condition 1
    const [textInput, setTextInput] = useState(review.text);
    const [ratingInput, setRatingInput] = useState("" + review.rating);

    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    const userLogged = useContext(userContext);

    // vars
    const author = review.user;
    const rating = review.rating;
    const timeReviewed = FbTimestampToReadable(review.timeReviewed.seconds);
    const isOwnReview = author.email === rLogged.email; // condition 2

    // CRUD
    const update = async () => {
        const userRef = firebase
            .firestore()
            .collection("users")
            .doc(userLogged.uid);

        const userObj = {
            uid: userLogged.uid,
            email: userLogged.email,
            ...(userLogged.displayName && {
                displayName: userLogged.displayName
            })
        };

        const updatedReview = dbFormat.createReview(
            userRef,
            ratingInput,
            textInput,
            userObj
        );

        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .setReview(productID, review.id, updatedReview)
            .then(() => {
                actionCreators.updateReviewSuccess(reviewsDispatch, review.id, {
                    id: review.id,
                    ...updatedReview
                });
                actionCreators.updateReviewSuccess(apiDispatch);
                toast.success("review update succeed");
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                toast.error("review update failed");
                throw err;
            });
    };

    const del = async () => {
        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .deleteReview(productID, review.id)
            .then(() => {
                actionCreators.deleteReviewSuccess(apiDispatch);
                actionCreators.deleteReviewSuccess(reviewsDispatch, review.id);
                toast.success("review delete succeed");
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                toast.error("review update failed");
                throw err;
            });
    };

    // handlers
    const handleDelete = async e => {
        e.preventDefault();
        await del();
    };

    const handleEdit = async e => {
        e.preventDefault();
        if (!isEditing) setIsEditing(!isEditing);
        else {
            await update().then(() => setIsEditing(false));
        }
    };
    const handleTextInputChange = e => setTextInput(e.target.value);
    const handleRatingInputChange = e => setRatingInput(e.target.value);
    const handleCancel = e => {
        e.preventDefault();
        setIsEditing(false);
    };

    // JSX chunks
    const ratingJSX = (
        <>
            <label>rating: </label>
            <input
                type="radio"
                value="1"
                checked={ratingInput === "1"}
                onChange={handleRatingInputChange}
            />
            <input
                type="radio"
                value="2"
                checked={ratingInput === "2"}
                onChange={handleRatingInputChange}
            />
            <input
                type="radio"
                value="3"
                checked={ratingInput === "3"}
                onChange={handleRatingInputChange}
            />
            <input
                type="radio"
                value="4"
                checked={ratingInput === "4"}
                onChange={handleRatingInputChange}
            />
            <input
                type="radio"
                value="5"
                checked={ratingInput === "5"}
                onChange={handleRatingInputChange}
            />
        </>
    );

    const textJSX = (
        <textarea value={textInput} onChange={handleTextInputChange} />
    );

    const deleteButton = (
        <button onClick={handleDelete} disabled={apiStatus ? true : false}>
            {apiStatus ? "deleting" : "delete"}
        </button>
    );

    const editButton = (
        <button onClick={handleEdit} disabled={apiStatus ? true : false}>
            {isEditing ? (apiStatus ? "submiting" : "submit") : "edit"}
        </button>
    );

    const cancelButton = <button onClick={handleCancel}>cancel editing</button>;

    return (
        <li>
            <form>
                <h4>
                    author:{" "}
                    {author.displayName ? author.displayName : author.email}
                </h4>
                {isEditing ? ratingJSX : <h5>Rating: {rating}</h5>}
                <h5>Posted on: {timeReviewed}</h5>
                {isEditing ? textJSX : <p>{review.text}</p>}
                {isOwnReview && deleteButton}
                {isOwnReview && editButton}
                {isEditing && cancelButton}
            </form>
        </li>
    );
};

ReviewSingle.propTypes = {};

export default ReviewSingle;
