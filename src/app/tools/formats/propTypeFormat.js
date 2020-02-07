import PropTypes from "prop-types";

//
// ---users---
export const authorType = PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired
}).isRequired;

// --- products---
export const productsRecivedType = PropTypes.arrayOf(
    PropTypes.shape({
        business: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
        lastReview: PropTypes.shape({}).isRequired,
        name: PropTypes.string.isRequired,
        ratingAverage: PropTypes.number.isRequired,
        reviewsTotal: PropTypes.number.isRequired
    })
).isRequired;

export const productsWithPhotoType = PropTypes.arrayOf(
    PropTypes.shape({
        business: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
        lastReview: PropTypes.shape({}).isRequired,
        name: PropTypes.string.isRequired,
        photoUrl: PropTypes.arrayOf(PropTypes.string),
        ratingAverage: PropTypes.number.isRequired,
        reviewsTotal: PropTypes.number.isRequired
    })
).isRequired;

//
// ---prod---
export const prodType = PropTypes.shape({
    business: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    lastReview: PropTypes.shape({}).isRequired,
    name: PropTypes.string.isRequired,
    ratingAverage: PropTypes.number.isRequired,
    reviewsTotal: PropTypes.number.isRequired
}).isRequired;

//
// ---reviews---
export const reviewType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    timeReviewed: PropTypes.shape({}).isRequired,
    user: authorType
}).isRequired;

export const reviewsReceivedType = PropTypes.arrayOf(reviewType).isRequired;
