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
