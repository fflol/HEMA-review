import { useReducer, useContext } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import ReviewInput from "../../components/reviewInput/ReviewInput";
import ReviewSingle from "../../components/reviewSingle/ReviewSingle";
import * as reducers from "../../tools/reducer";
import * as apiUtils from "../../firebase/firebaseApiUtils";
import { userContext } from "../../tools/reactContext";

//
// component
const Prod = ({ prod, reviewsReceived }) => {
    const [reviews, reviewsDispatch] = useReducer(
        reducers.reviewsReducer,
        reviewsReceived
    );
    const userLogged = useContext(userContext);

    const hasUserReviewed =
        reviews.filter(review => review.user.email === userLogged.email)
            .length > 0;

    return (
        <>
            <h1>{prod.name}</h1>
            <p>reviews: {prod.reviewsTotal}</p>
            <p>rating: {prod.ratingAverage}</p>
            <p>
                from:
                <Link
                    href="/business/[id]"
                    as={`/business/${prod.business.id}`}
                >
                    <a>{prod.business.name}</a>
                </Link>
            </p>
            <br />
            {!hasUserReviewed && (
                <ReviewInput
                    productID={prod.id}
                    reviewsDispatch={reviewsDispatch}
                />
            )}
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
        reviewsReceived: await apiUtils.getReviews(query.id)
    };
};

Prod.propTypes = {};

export default Prod;
