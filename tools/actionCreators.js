import * as actionTypes from "./actionTypes";

export const beginApiCall = dispatch =>
    dispatch({ type: actionTypes.API_CALL_BEGIN });

export const apiCallError = dispatch =>
    dispatch({ type: actionTypes.API_CALL_ERROR });

export const createReviewSuccess = (dispatch, newReview) =>
    dispatch({
        type: actionTypes.CREATE_REVIEW_SUCCESS,
        newReview
    });

export const deleteReviewSuccess = (dispatch, reviewID) =>
    dispatch({
        type: actionTypes.DELETE_REVIEW_SUCCESS,
        reviewID
    });

export const updateReviewSuccess = (dispatch, reviewID, updatedReview) =>
    dispatch({
        type: actionTypes.UPDATE_REVIEW_SUCCESS,
        reviewID,
        updatedReview
    });
