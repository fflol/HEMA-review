import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import * as actionCreators from "../../tools/actionCreators";
import * as reducers from "../../tools/reducer";
import * as apiUtils from "../../firebase/firebaseApiUtils";

const UserProfile = ({
    user,
    nameInput,
    setNameInput,
    setIsEditingProfile
}) => {
    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    // CRUD
    const updateNameAndPhoto = async () => {
        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .updateAuthUserNameAndPhoto(nameInput, null)
            .then(() => {
                actionCreators.apiCallSuccess(apiDispatch);
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                toast.error("user info update failed");
                throw err;
            });

        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .updateDBUserNameAndPhoto(user.uid, nameInput, null)
            .then(() => {
                actionCreators.apiCallSuccess(apiDispatch);
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                toast.error("user profile update failed");
                throw err;
            });
    };

    // handlers
    const handleNameInputChange = e => setNameInput(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();
        if (nameInput !== user.displayName) {
            await updateNameAndPhoto().then(() => {
                toast.success("user profile update succeed");
                setIsEditingProfile(false);
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>
                    name:
                    <input
                        type="text"
                        value={nameInput}
                        onChange={handleNameInputChange}
                    />
                </h1>
            </div>
            <div>
                <p>photo: {user.photoURL}</p>
            </div>
            <button type="submit" disabled={apiStatus ? true : false}>
                {apiStatus ? "submitting" : "submit edit"}
            </button>
        </form>
    );
};

UserProfile.propTypes = {};

export default UserProfile;
