import fetch from "isomorphic-unfetch";

//
//CRUD
export const postReview = async newReview =>
    await fetch(`${process.env.DEV_URL}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
    }).then(handleResponse);

export const deleteReview = async reviewID =>
    await fetch(`${process.env.DEV_URL}/reviews/${reviewID}`, {
        method: "DELETE"
    }).then(handleResponse);

export const putReview = async (reviewID, updatedReview) =>
    await fetch(`${process.env.DEV_URL}/reviews/${reviewID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedReview)
    }).then(handleResponse);

// misc
export const handleResponse = async response => {
    if (response.ok) return response.json();
    if (response.status === 400) {
        // So, a server-side validation error occurred.
        // Server side validation returns a string error message, so parse as text instead of json.
        const error = await response.text();
        throw new Error(error);
    }
    throw new Error("Network response was not ok.");
};

// In a real app, would likely call an error logging service.
export const handleError = error => {
    // eslint-disable-next-line no-console
    console.error("API call failed. " + error);
    throw error;
};
