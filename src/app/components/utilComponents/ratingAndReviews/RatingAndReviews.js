import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

import { useStyles } from "./styles";

const RatingAndReviews = ({ ratingValue, reviewsValue }) => {
    const classes = useStyles();

    return (
        <div>
            <Rating
                name="average-rating"
                precision={0.5}
                value={ratingValue}
                size="small"
                readOnly
            />
            <Typography
                component="span"
                variant="subtitle1"
                color="textSecondary"
                className={classes.RatingText}
            >
                {reviewsValue} reviews
            </Typography>
        </div>
    );
};

RatingAndReviews.propTypes = {
    ratingValue: PropTypes.number.isRequired,
    reviewsValue: PropTypes.number.isRequired
};

export default RatingAndReviews;
