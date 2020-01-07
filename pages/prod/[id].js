import { useReducer } from "react";
import PropTypes from "prop-types";
import "firebase/firestore";

import ReviewInput from "../../components/reviewInput/ReviewInput";
import ReviewSingle from "../../components/reviewSingle/ReviewSingle";
import * as helpers from "../../tools/helpers";
import * as reducers from "../../tools/reducer";
import * as apiUtils from "../../firebase/firebaseApiUtils";

//
// component
const Prod = ({ prod, reviewsProp }) => {
    const [reviews, reviewsDispatch] = useReducer(
        reducers.reviewsReducer,
        reviewsProp
    );

    return (
        <>
            <h1>{prod.name}</h1>
            <p>reviews: {prod.reviewsTotal}</p>
            <p>stars: {prod.ratingAverage}</p>
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
                        productID={prod.id}
                        review={review}
                        reviewsDispatch={reviewsDispatch}
                    />
                ))}
            </ul>
        </>
    );
};

//
Prod.getInitialProps = async ({ query }) => {
    return {
        prod: await apiUtils.getProd(query.id),
        reviewsProp: await apiUtils.getReviews(query.id)
    };
};

Prod.propTypes = {};

export default Prod;
