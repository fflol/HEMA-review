import * as fb from "firebase/app";

//
// --- reviews ---
export const createReview = (ratingInput, textInput, userObj, userRef) => ({
    timeReviewed: fb.firestore.Timestamp.now(),
    rating: ratingInput,
    text: textInput,
    user: userObj,
    ...(userRef && { userRef }) // local data doesnt need ref
});

export const updateReview = (ratingInput, textInput) => ({
    timeReviewed: fb.firestore.Timestamp.now(),
    rating: ratingInput,
    text: textInput
});

//
// --- users ---
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
    ...(timeRegistered && { timeRegistered }), // local context data dont need these
    ...(reviews || (reviews === 0 && { reviews }))
});

//
// --- products ---
export const createProd = (business, description, name, currency, price) => ({
    business,
    businessRef: fb
        .firestore()
        .collection("businesses")
        .doc(business.id),
    description,
    lastReview: null,
    name,
    price: { [currency]: price },
    ratingAverage: null,
    reviewsTotal: null
});

export const updateProd = description => ({
    description
});
