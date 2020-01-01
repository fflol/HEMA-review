import * as actionTypes from "./actionTypes";

//
// review reducer
export const reviewsReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.CREATE_REVIEW_SUCCESS:
            return [action.newReview, ...state];
        case actionTypes.UPDATE_REVIEW_SUCCESS:
            const targetIndex = state.findIndex(
                obj => obj.id === action.reviewID
            );
            return [
                ...state.slice(0, targetIndex),
                action.updatedReview,
                ...state.slice(targetIndex + 1)
            ];
        case actionTypes.DELETE_REVIEW_SUCCESS:
            return state.filter(review => review.id !== action.reviewID);
        default:
            return state;
    }
};

//
// api status reducer
// check if a type ends with 'SUCCESS', from Dan Abramov
const actionTypeEndsInSuccess = type => {
    return type.substring(type.length - 8);
};

export const apiStatusReducer = (state, action) => {
    if (action.type === actionTypes.API_CALL_BEGIN) {
        return state + 1;
    } else if (
        action.type === actionTypes.API_CALL_ERROR ||
        actionTypeEndsInSuccess(action.type)
    )
        return state - 1;
    return state;
};
