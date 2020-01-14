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
    emailInput,
    setEmailInput,
    setIsEditing
}) => {
    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    // CRUD
    const updateNameAndPhoto = async () => {
        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .updateAuthUserNameAndPhoto(nameInput, null)
            .then(() => {
                actionCreators.apiCallSuccess(apiDispatch);
                if (apiStatus === 0) {
                    toast.success("user info update succeed");
                }
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
                if (apiStatus === 0) toast.success("user info update succeed");
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                toast.error("user info update failed");
                throw err;
            });
    };

    const updateEmail = async () => {
        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .updateAuthUserEmail(emailInput)
            .then(() => {
                actionCreators.apiCallSuccess(apiDispatch);
                if (apiStatus === 0) toast.success("user info update succeed");
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                toast.error("user info update failed");
                throw err;
            });

        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .updateDBUserEmail(user.uid, emailInput)
            .then(() => {
                actionCreators.apiCallSuccess(apiDispatch);
                if (apiStatus === 0) toast.success("user info update succeed");
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                toast.error("user info update failed");
                throw err;
            });
    };

    // handlers
    const handleNameInputChange = e => setNameInput(e.target.value);
    const handleEmailInputChange = e => setEmailInput(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();
        if (nameInput !== user.displayName) {
            await updateNameAndPhoto().then(() => setIsEditing(false));
        }
        if (emailInput !== user.email) {
            await updateEmail().then(() => setIsEditing(false));
        }
    };

    return (
        <form>
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
            <div>
                email:
                <input
                    type="email"
                    value={emailInput}
                    onChange={handleEmailInputChange}
                />
            </div>
            <button onClick={handleSubmit} disabled={apiStatus ? true : false}>
                {apiStatus ? "submitting" : "submit edit"}
            </button>
        </form>
    );
};

UserProfile.propTypes = {};

export default UserProfile;
