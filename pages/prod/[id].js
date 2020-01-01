import React, { useState, useReducer } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import ReviewInput from "../../components/reviewInput/ReviewInput";
import ReviewSingle from "../../components/reviewSingle/ReviewSingle";
import * as helpers from "../../tools/helpers";
import * as reducers from "../../tools/reducer";

//
// component
const Prod = ({ productsTotal, reviewsTotal, usersTotal }) => {
    const id = useRouter().query.id;
    const prod = productsTotal.find(prod => prod.id === id);
    const reviewsForThisProd = helpers.findReviewsForThisProd(reviewsTotal, id);

    const [reviews, reviewsDispatch] = useReducer(
        reducers.reviewsReducer,
        reviewsForThisProd
    );

    return (
        <>
            <h1>{prod.name}</h1>
            <p>reviews: {prod.reviewTotal}</p>
            <p>stars: {prod.starsAverage}</p>
            <br />
            <ReviewInput
                productID={prod.id}
                reviewsDispatch={reviewsDispatch}
            />
            <br />
            <h3>Reviews: </h3>
            <ul>
                {reviews.map(review => (
                    <ReviewSingle
                        key={review.id}
                        review={review}
                        usersTotal={usersTotal}
                        reviewsDispatch={reviewsDispatch}
                    />
                ))}
            </ul>
        </>
    );
};

//
Prod.getInitialProps = async () => {
    const db = await fetch(`${process.env.DEV_URL}/db`)
        .then(res => res.json())
        .catch(err => console.log(err));
    return {
        productsTotal: db.products,
        reviewsTotal: db.reviews,
        usersTotal: db.users
    };
};

Prod.propTypes = {};

export default Prod;
