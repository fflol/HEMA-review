import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import * as actionCreators from "../../tools/actionCreators";
import * as reducers from "../../tools/reducer";
import * as apiUtils from "../../firebase/firebaseApiUtils";

const UserEmail = ({ user, emailInput, setEmailInput, setIsEditingEmail }) => {
    const [passwordInput, setPasswordInput] = useState("");
    const [progress, setProgress] = useState(0);
    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    //CRUD
    const reAuth = async () => {
        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .reAuthenticate(apiUtils.getCredential(passwordInput))
            .then(() => {
                actionCreators.apiCallSuccess(apiDispatch);
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                throw err;
            });
    };

    const updateEmail = async () => {
        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .updateAuthUserEmail(emailInput)
            .then(() => {
                actionCreators.apiCallSuccess(apiDispatch);
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                toast.error("user email update failed");
                throw err;
            });

        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .updateDBUserEmail(user.uid, emailInput)
            .then(() => {
                actionCreators.apiCallSuccess(apiDispatch);
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                toast.error("email update failed");
                throw err;
            });
    };

    // handlers
    const handleEmailInputChange = e => setEmailInput(e.target.value);
    const handlePasswordInputChange = e => setPasswordInput(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();
        if (progress === 0) {
            return await reAuth().then(() => {
                setPasswordInput("");
                toast.success("password recheck succeed");
                setProgress(1);
            });
        }
        if (progress === 1) {
            if (emailInput === user.email)
                return console.log("enter new email");
            return await updateEmail().then(() => {
                setEmailInput("");
                setProgress(0);
                toast.success("email update succeed");
                apiUtils.signOut();
                setIsEditingEmail(false);
            });
        }
    };

    return (
        <>
            {progress === 0 && (
                <form onSubmit={handleSubmit}>
                    <label>enter existing password</label>
                    <input
                        type="password"
                        value={passwordInput}
                        onChange={handlePasswordInputChange}
                    />
                    <button type="submit" disabled={apiStatus ? true : false}>
                        {apiStatus ? "submitting" : "submit password"}
                    </button>
                </form>
            )}

            {progress === 1 && (
                <form onSubmit={handleSubmit}>
                    email:
                    <input
                        type="email"
                        value={emailInput}
                        onChange={handleEmailInputChange}
                    />
                    <button type="submit" disabled={apiStatus ? true : false}>
                        {apiStatus ? "submitting" : "submit edit"}
                    </button>
                </form>
            )}
        </>
    );
};

UserEmail.propTypes = {};

export default UserEmail;
