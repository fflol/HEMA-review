import { useReducer, useState, useEffect, useContext } from "react";
// import PropTypes from "prop-types";
import Link from "next/link";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import ReviewInput from "../../components/reviewInput/ReviewInput";
import ReviewSingle from "../../components/reviewSingle/ReviewSingle";
import * as reducers from "../../tools/useReduceHelpers/reducer";
import * as apiUtils from "../../firebase/firebaseApiUtils";
import * as propTypesFormat from "../../tools/formats/propTypeFormat";
import * as storageApis from "../../firebase/firebaseStorageApis";
import { userContext } from "../../tools/reactContext";
import SignIn from "../../components/header/SignIn";
import { useStyles } from "../../styles/styles";
import { RatingAndReviews } from "../../components/utilComponents";

//
// component
const Prod = ({ prodReceived, reviewsReceived }) => {
    const [prod, setProd] = useState(prodReceived); // to add photoUrl later
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
        // on mount, add photoUrl in prod
        (async () =>
            setProd(await storageApis.addPhotoUrlToProd(prodReceived)))();
    }, []);

    useEffect(() => {
        setHasUserReviewed(
            reviews.filter(review => review.user.email === userLogged.email)
                .length > 0
        );
    }, [reviews, userLogged.email]); // re-checks every time when reviews updates

    return (
        <>
            <Paper square>
                <Box p={1} mb={1}>
                    {prod.photoUrl && (
                        <GridList cols={2.5} cellHeight={320}>
                            {prod.photoUrl.map(url => (
                                <GridListTile key={url}>
                                    <img src={url} alt={`${prod.name} photo`} />
                                </GridListTile>
                            ))}
                        </GridList>
                    )}
                </Box>
            </Paper>
            <Paper square>
                <Box p={1} mb={1}>
                    <Typography variant="h4">{prod.name}</Typography>
                    <Typography variant="subtitle1">
                        from:{" "}
                        <Link
                            href="/business/[id]"
                            as={`/business/${prod.business.id}`}
                        >
                            <a>{prod.business.name}</a>
                        </Link>
                    </Typography>
                    <RatingAndReviews
                        ratingValue={prod.ratingAverage}
                        reviewsValue={prod.reviewsTotal}
                    />
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className={classes.prodPrice}
                    >
                        ${` ${prod.price && prod.price.usDollar}`}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.prodDescription}
                    >
                        {prod.description}
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
        prodReceived: await apiUtils.getProd(query.id),
        reviewsReceived: await apiUtils.getReviews(query.id)
    };
};

Prod.propTypes = {
    prodReceived: propTypesFormat.prodType,
    reviewsReceived: propTypesFormat.reviewsReceivedType
};

export default Prod;
