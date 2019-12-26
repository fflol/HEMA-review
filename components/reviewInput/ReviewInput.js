import React, { useState } from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
import nanoid from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as apiUtils from "../../tools/apiUtils";

//
// component
const ReviewInput = ({ productID, updateReviews }) => {
    const [input, setInput] = useState("");
    const handleInput = e => setInput(e.target.value);
    const handleSubmit = async e => {
        e.preventDefault();
        // console.log(e.target.rating.value);
        // console.log(e.target.review.value);
        const newReview = {
            id: nanoid(10),
            userID: "testID",
            productID: productID,
            timeReviewed: Date.now(),
            starsReview: e.target.rating.value,
            text: input
        };
        await fetch("http://localhost:4000/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview)
        })
            .then(apiUtils.handleResponse)
            .then(() => {
                updateReviews(newReview);
                toast.success("review post succeed");
                setInput("");
            })
            .catch(apiUtils.handleError);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>rating: </label>
            <input type="radio" name="rating" value="1" />
            <input type="radio" name="rating" value="2" />
            <input type="radio" name="rating" value="3" />
            <input type="radio" name="rating" value="4" />
            <input type="radio" name="rating" value="5" />
            <br />
            <label>review: </label>
            <textarea value={input} name="review" onChange={handleInput} />
            <br />
            <button>submit</button>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        </form>
    );
};

ReviewInput.propTypes = {};

export default ReviewInput;
