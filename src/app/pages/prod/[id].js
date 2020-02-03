import { useReducer, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Rating from "@material-ui/lab/Rating";

import ReviewInput from "../../components/reviewInput/ReviewInput";
import ReviewSingle from "../../components/reviewSingle/ReviewSingle";
import * as reducers from "../../tools/reducer";
import * as apiUtils from "../../firebase/firebaseApiUtils";
import { userContext } from "../../tools/reactContext";
import SignIn from "../../components/header/SignIn";
import { useStyles } from "../../styles/styles";

//
// component
const Prod = ({ prod, reviewsReceived }) => {
    const [reviews, reviewsDispatch] = useReducer(
        reducers.reviewsReducer,
        reviewsReceived
    );
    const userLogged = useContext(userContext);

    const classes = useStyles();

    const [hasUserReviewed, setHasUserReviewed] = useState(
        reviews.filter(review => review.user.email === userLogged.email)
            .length > 0 // check if reviews has a user === logged user
    );

    useEffect(() => {
        setHasUserReviewed(
            reviews.filter(review => review.user.email === userLogged.email)
                .length > 0
        );
    }, [reviews]); // re-checks every time when reviews updates

    //var

    return (
        <>
            <Paper square>
                <Box p={1} mb={1}>
                    <Typography variant="h4">{prod.name}</Typography>
                    <Rating
                        name="average-rating"
                        precision={0.5}
                        value={prod.ratingAverage}
                        size="small"
                        readOnly
                    />
                    <Typography
                        variant="subtitle1"
                        display="inline"
                        color="textSecondary"
                        className={classes.prodRatingText}
                    >
                        {prod.reviewsTotal} reviews
                    </Typography>
                    <Typography variant="subtitle1">
                        from:{" "}
                        <Link
                            href="/business/[id]"
                            as={`/business/${prod.business.id}`}
                        >
                            <a>{prod.business.name}</a>
                        </Link>
                    </Typography>
                </Box>
            </Paper>
            <Paper square>
                <Box p={1} mb={1}>
                    {!userLogged.email ? (
                        <div className={classes.prodSignInText}>
                            <SignIn /> to review this product
                        </div>
                    ) : (
                        !hasUserReviewed && (
                            <ReviewInput
                                productID={prod.id}
                                reviewsDispatch={reviewsDispatch}
                            />
                        )
                    )}
                </Box>
            </Paper>
            <Paper square>
                <Box p={1} mb={1} whiteSpace="pre-wrap">
                    <Typography variant="h6">Reviews: </Typography>
                    <List>
                        {reviews.map(review => (
                            <ReviewSingle
                                key={review.id}
                                productID={prod.id}
                                review={review}
                                reviewsDispatch={reviewsDispatch}
                            />
                        ))}
                    </List>
                </Box>
            </Paper>
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

Prod.propTypes = {
    prod: PropTypes.shape({
        business: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
        lastReview: PropTypes.shape({}).isRequired,
        name: PropTypes.string.isRequired,
        ratingAverage: PropTypes.number.isRequired,
        reviewsTotal: PropTypes.number.isRequired
    }).isRequired,
    reviewsReceived: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
    ).isRequired
};

export default Prod;
