import * as fb from "firebase/app";

export const createReview = (userRef, ratingInput, textInput, userObj) => ({
    userRef,
    timeReviewed: fb.firestore.Timestamp.now(),
    rating: parseInt(ratingInput),
    text: textInput,
    user: userObj
});

export const createUser = (
    displayName,
    email,
    photoURL,
    emailVerified,
    timeRegistered,
    reviews
) => ({
    displayName,
    email,
    photoURL,
    emailVerified,
    ...(timeRegistered && { timeRegistered }),
    ...(reviews && { reviews })
});
