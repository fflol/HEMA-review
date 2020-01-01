import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import * as apiUtils from "../../tools/apiUtils";
import * as actionCreators from "../../tools/actionCreators";
import * as reducers from "../../tools/reducer";

//
// component
const ReviewSingle = ({ review, usersTotal, reviewsDispatch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [textInput, setTextInput] = useState("");
    const [starsInput, setStarsInput] = useState(null);

    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    // vars
    const user = usersTotal.find(user => user.id === review.userID).name;
    const stars = review.starsReview;

    // CRUD
    const del = async () => {
        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .deleteReview(review.id)
            .catch(apiUtils.handleError)
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

    const update = async () => {
        actionCreators.beginApiCall(apiDispatch);
        const updatedReview = {
            id: review.id,
            userID: review.userID,
            productID: review.productID,
            timeReviewed: Date.now(),
            starsReview: starsInput,
            text: textInput
        };
        await apiUtils
            .putReview(review.id, updatedReview)
            .catch(apiUtils.handleError)
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
    const handleStarsInputChange = e => setStarsInput(e.target.value);
    const handleCancel = e => {
        e.preventDefault();
        setIsEditing(false);
    };

    // JSX chunks
    const starsJSX = (
        <>
            <label>rating: </label>
            <input
                type="radio"
                value="1"
                checked={starsInput === "1"}
                onChange={handleStarsInputChange}
            />
            <input
                type="radio"
                value="2"
                checked={starsInput === "2"}
                onChange={handleStarsInputChange}
            />
            <input
                type="radio"
                value="3"
                checked={starsInput === "3"}
                onChange={handleStarsInputChange}
            />
            <input
                type="radio"
                value="4"
                checked={starsInput === "4"}
                onChange={handleStarsInputChange}
            />
            <input
                type="radio"
                value="5"
                checked={starsInput === "5"}
                onChange={handleStarsInputChange}
            />
        </>
    );

    const textJSX = (
        <textarea value={textInput} onChange={handleTextInputChange} />
    );

    return (
        <li>
            <form>
                <h4>user: {user}</h4>
                {isEditing ? starsJSX : <h5>Stars: {stars}</h5>}
                <h5>
                    Posted on:{" "}
                    {new Date(review.timeReviewed).toLocaleDateString("en-US")}
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
