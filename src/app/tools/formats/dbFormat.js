import * as fb from "firebase/app";
import * as formatOptions from "./dbformatOptions";

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
export const createProd = (businessID, description, name, currency, price) => {
    const business = formatOptions.businessesOptions.find(
        business => business.id === businessID
    );

    return {
        business: {
            id: businessID,
            name: business.name
        },
        businessRef: fb
            .firestore()
            .collection("businesses")
            .doc(businessID),
        description,
        lastReview: {},
        name,
        price: { [currency]: price },
        ratingAverage: 0,
        reviewsTotal: 0
    };
};

export const updateProd = (description, currency, price) => ({
    description,
    price: { [currency]: price }
});
