import * as fb from "firebase/app";

export const createReview = (ratingInput, textInput, userObj, userRef) => ({
    timeReviewed: fb.firestore.Timestamp.now(),
    rating: ratingInput,
    text: textInput,
    user: userObj,
    ...(userRef && { userRef })
});

export const updateReview = (ratingInput, textInput) => ({
    timeReviewed: fb.firestore.Timestamp.now(),
    rating: ratingInput,
    text: textInput
});

export const createUser = (
    displayName,
    email,
    photoURL,
    emailVerified,
    provider,
    timeRegistered,
    reviews
) => ({
    displayName,
    email,
    photoURL,
    emailVerified,
    provider,
    ...(timeRegistered && { timeRegistered }),
    ...(reviews || (reviews === 0 && { reviews }))
});
