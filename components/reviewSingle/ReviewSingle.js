import React from "react";
import PropTypes from "prop-types";

const ReviewSingle = ({ review, usersTotal }) => {
    return (
        <li key={review.id}>
            <h4>
                user: {usersTotal.find(user => user.id === review.userID).name}
            </h4>
            <h5>Stars: {review.starsReview}</h5>
            <h5>
                Posted on:{" "}
                {new Date(review.timeReviewed).toLocaleDateString("en-US")}
            </h5>
            <p>{review.text}</p>
        </li>
    );
};

ReviewSingle.propTypes = {};

export default ReviewSingle;
