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
const ReviewInput = ({ productID, reviewsDispatch }) => {
    const [textInput, setTextInput] = useState("");
    const [ratingInput, setRatingInput] = useState(null);

    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    // CRUD
    const create = async () => {
        const userRef = firebase
            .firestore()
            .collection("users")
            .doc("9QpN0ED5sJp8VZdsKRdk");
        const time = fb.firestore.Timestamp.now();

        const newReview = {
            user: userRef,
            timeReviewed: time,
            rating: parseInt(ratingInput),
            text: textInput
        };

        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .addReview(productID, newReview)
            .then(id => {
                actionCreators.createReviewSuccess(apiDispatch);
                actionCreators.createReviewSuccess(reviewsDispatch, {
                    ...newReview,
                    id
                });
                toast.success("review post succeed");
                setTextInput("");
                setRatingInput("");
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                throw err;
            });
    };

    // handlers
    const handleTextInput = e => setTextInput(e.target.value);
    const handleStarsChange = e => setRatingInput(e.target.value);
    const handleSubmit = async e => {
        e.preventDefault();
        await create();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>rating: </label>
            <input
                type="radio"
                value="1"
                checked={ratingInput === "1"}
                onChange={handleStarsChange}
            />
            <input
                type="radio"
                value="2"
                checked={ratingInput === "2"}
                onChange={handleStarsChange}
            />
            <input
                type="radio"
                value="3"
                checked={ratingInput === "3"}
                onChange={handleStarsChange}
            />
            <input
                type="radio"
                value="4"
                checked={ratingInput === "4"}
                onChange={handleStarsChange}
            />
            <input
                type="radio"
                value="5"
                checked={ratingInput === "5"}
                onChange={handleStarsChange}
            />

            <br />
            <label>review: </label>
            <textarea value={textInput} onChange={handleTextInput} />
            <br />
            <button disabled={apiStatus ? true : false}>
                {apiStatus ? "submiting..." : "submit"}
            </button>
        </form>
    );
};

ReviewInput.propTypes = {};

export default ReviewInput;
