import React, { useState, useReducer, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import * as apiUtils from "../../firebase/firebaseApiUtils";
import * as actionCreators from "../../tools/actionCreators";
import * as reducers from "../../tools/reducer";
import * as dbFormat from "../../tools/dbFormat";
import { userContext } from "../../tools/reactContext";
import { FbTimestampToReadable } from "../../tools/timeFormat";
import EditContent from "./EditContent";
import DisplayContent from "./DisplayContent";

//
// component
const ReviewSingle = ({ productID, review, reviewsDispatch }) => {
    const [isEditing, setIsEditing] = useState(false); // condition 1
    // const [ratingInput, setRatingInput] = useState("" + review.rating);
    const [ratingInput, setRatingInput] = useState(review.rating);
    const [textInput, setTextInput] = useState(review.text);

    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    const userLogged = useContext(userContext);

    // vars
    const author = review.user;
    const timeReviewed = FbTimestampToReadable(review.timeReviewed.seconds);
    const isOwnReview = userLogged.email && author.email === userLogged.email; // condition 2

    // CRUD
    const update = async () => {
        const updatedReview = dbFormat.updateReview(ratingInput, textInput);
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
                console.log(err);
            });
    };

    // handlers
    const handleRatingChange = (e, newValue) => setRatingInput(newValue);
    const handleTextChange = e => setTextInput(e.target.value);

    const handleDelete = async e => {
        e.preventDefault();
        await del();
    };

    const handleSubmitEdit = async e => {
        e.preventDefault();
        await update().then(() => setIsEditing(false));
    };

    const handleEditOpen = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);

    return !isEditing ? (
        <DisplayContent
            review={review}
            timeReviewed={timeReviewed}
            isOwnReview={isOwnReview}
            handleEditOpen={handleEditOpen}
            handleDelete={handleDelete}
        />
    ) : (
        <EditContent
            author={author}
            timeReviewed={timeReviewed}
            apiStatus={apiStatus}
            ratingInput={ratingInput}
            handleRatingChange={handleRatingChange}
            textInput={textInput}
            handleTextChange={handleTextChange}
            handleSubmitEdit={handleSubmitEdit}
            handleCancel={handleCancel}
        />
    );
};

ReviewSingle.propTypes = {
    productID: PropTypes.string.isRequired,
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
    reviewsDispatch: PropTypes.func.isRequired
};

export default ReviewSingle;
