import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as fb from "firebase/app";

import * as apiUtils from "../../firebase/firebaseApiUtils";
import * as actionCreators from "../../tools/actionCreators";
import * as reducers from "../../tools/reducer";
import { firebase } from "../../firebase/firebaseConfig";

//
// component
const ReviewSingle = ({ productID, review, reviewsDispatch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [textInput, setTextInput] = useState(review.text);
    const [ratingInput, setRatingInput] = useState("" + review.rating);

    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    // vars
    const user = review.user;
    const rating = review.rating;

    // CRUD
    const update = async () => {
        const userRef = firebase
            .firestore()
            .collection("users")
            .doc("9QpN0ED5sJp8VZdsKRdk");
        const time = fb.firestore.Timestamp.now();

        const updatedReview = {
            id: review.id,
            user: userRef,
            timeReviewed: time,
            rating: parseInt(ratingInput),
            text: textInput
        };

        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .setReview(productID, review.id, updatedReview)
            .then(() => {
                actionCreators.updateReviewSuccess(
                    reviewsDispatch,
                    review.id,
                    updatedReview
                );
                actionCreators.updateReviewSuccess(apiDispatch);
                toast.success("review update succeed");
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
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
            await update();
            setIsEditing(false);
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

    return (
        <li>
            <form>
                <h4>user: {user.name}</h4>
                {isEditing ? ratingJSX : <h5>Rating: {rating}</h5>}
                <h5>
                    Posted on:{" "}
                    {new Date(
                        review.timeReviewed.seconds * 1000
                    ).toLocaleDateString("en-US")}
                </h5>
                {isEditing ? textJSX : <p>{review.text}</p>}
                <button
                    onClick={handleDelete}
                    disabled={apiStatus ? true : false}
                >
                    {apiStatus ? "deleting" : "delete"}
                </button>
                <button
                    onClick={handleEdit}
                    disabled={apiStatus ? true : false}
                >
                    {isEditing ? (apiStatus ? "submiting" : "submit") : "edit"}
                </button>
                {isEditing && (
                    <button onClick={handleCancel}>cancel editing</button>
                )}
            </form>
        </li>
    );
};

ReviewSingle.propTypes = {};

export default ReviewSingle;
