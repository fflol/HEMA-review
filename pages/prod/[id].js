import React, { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import ReviewInput from "../../components/reviewInput/ReviewInput";
import ReviewSingle from "../../components/reviewSingle/ReviewSingle";

//
// component
const Prod = ({ productsTotal, reviewsTotal, usersTotal }) => {
    const router = useRouter();
    const id = router.query.id;
    const prod = productsTotal.find(prod => prod.id === id);

    const [reviews, setReviews] = useState(
        reviewsTotal.filter(review => review.productID === id)
    );
    const updateReviews = newReview => setReviews([...reviews, newReview]);

    const sortedReviews = reviews.sort(
        (a, b) => a.timeReviewed < b.timeReviewed
    );

    return (
        <>
            <h1>{prod.name}</h1>
            <p>reviews: {prod.reviewTotal}</p>
            <p>stars: {prod.starsAverage}</p>
            <br />
            <ReviewInput productID={prod.id} updateReviews={updateReviews} />
            <br />
            <h3>Reviews: </h3>
            <ul>
                {sortedReviews.map(review => (
                    <ReviewSingle
                        key={review.id}
                        review={review}
                        usersTotal={usersTotal}
                    />
                ))}
            </ul>
        </>
    );
};

//
Prod.getInitialProps = async () => {
    const db = await fetch("http://localhost:4000/db/")
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
