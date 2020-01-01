import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import { toast } from "react-toastify";

import * as apiUtils from "../../tools/apiUtils";
import * as actionCreators from "../../tools/actionCreators";
import * as reducers from "../../tools/reducer";

//
// component
const ReviewInput = ({ productID, reviewsDispatch }) => {
    const [textInput, setTextInput] = useState("");
    const [stars, setStars] = useState(null);

    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    // CRUD
    const create = async () => {
        const newReview = {
            id: nanoid(10),
            userID: "testID",
            productID: productID,
            timeReviewed: Date.now(),
            starsReview: stars,
            text: textInput
        };
        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .postReview(newReview)
            .catch(apiUtils.handleError)
            .then(() => {
                actionCreators.createReviewSuccess(apiDispatch);
                actionCreators.createReviewSuccess(reviewsDispatch, newReview);
                toast.success("review post succeed");
                setTextInput("");
                setStars("");
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                throw err;
            });
    };

    // handlers
    const handleTextInput = e => setTextInput(e.target.value);
    const handleStarsChange = e => setStars(e.target.value);
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
                checked={stars === "1"}
                onChange={handleStarsChange}
            />
            <input
                type="radio"
                value="2"
                checked={stars === "2"}
                onChange={handleStarsChange}
            />
            <input
                type="radio"
                value="3"
                checked={stars === "3"}
                onChange={handleStarsChange}
            />
            <input
                type="radio"
                value="4"
                checked={stars === "4"}
                onChange={handleStarsChange}
            />
            <input
                type="radio"
                value="5"
                checked={stars === "5"}
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
