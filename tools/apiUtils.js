import { firebase } from "../firebase/firebaseConfig";

const db = firebase.firestore();

//
//CRUD
export const addReview = async (productID, newReview) =>
    await db
        .collection("products")
        .doc(productID)
        .collection("reviews")
        .add(newReview)
        .then(res => res.id)
        .catch(err => console.log(err));
// export const postReview = async newReview =>
//     await fetch(`${process.env.DEV_URL}/reviews`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newReview)
//     }).then(handleResponse);

export const deleteReview = async (productID, reviewID) =>
    await db
        .collection("products")
        .doc(productID)
        .collection("reviews")
        .doc(reviewID)
        .delete()
        .catch(err => console.log(err));
// await fetch(`${process.env.DEV_URL}/reviews/${reviewID}`, {
//     method: "DELETE"
// }).then(handleResponse);

export const setReview = async (productID, reviewID, updatedReview) =>
    await db
        .collection("products")
        .doc(productID)
        .collection("reviews")
        .doc(reviewID)
        .set(updatedReview)
        .catch(err => console.log(err));
// await fetch(`${process.env.DEV_URL}/reviews/${reviewID}`, {
//     method: "PUT",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify(updatedReview)
// }).then(handleResponse);

//
// misc
export const handleResponse = async response => {
    if (response.status === 400) {
        // So, a server-side validation error occurred.
        // Server side validation returns a string error message, so parse as text instead of json.
        const error = await response.text();
        throw new Error(error);
    }
    return response.id;
};
// export const handleResponse = async response => {
//     if (response.ok) return response.json();
//     if (response.status === 400) {
//         // So, a server-side validation error occurred.
//         // Server side validation returns a string error message, so parse as text instead of json.
//         const error = await response.text();
//         throw new Error(error);
//     }
//     throw new Error("Network response was not ok.");
// };

// In a real app, would likely call an error logging service.
export const handleError = error => {
    // eslint-disable-next-line no-console
    console.error("API call failed. " + error);
    throw error;
};
