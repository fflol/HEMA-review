import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import * as apiUtils from "../../firebase/firebaseApiUtils";
import * as actionCreators from "../../tools/actionCreators";
import * as reducers from "../../tools/reducer";

const UserPassword = () => {
    const [progress, setProgress] = useState(0);
    const [passwordInput, setPasswordInput] = useState("");

    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    // CRUD
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

    const updatePassword = async () => {
        actionCreators.beginApiCall(apiDispatch);
        await apiUtils
            .updateAuthUserPassword(passwordInput)
            .then(() => {
                actionCreators.apiCallSuccess(apiDispatch);
                toast.success("user password update succeed");
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                toast.error("user password update failed");
                throw err;
            });
    };

    // handlers
    const handleSubmit = async () => {
        if (progress === 0) {
            return await reAuth().then(() => {
                setPasswordInput("");
                setProgress(1);
            });
        }
        if (progress === 1) {
            return await updatePassword().then(() => {
                setPasswordInput("");
                setProgress(0);
            });
        }
    };

    const handlePasswordInputChange = e => setPasswordInput(e.target.value);

    return (
        <>
            <label>
                {progress === 0
                    ? "enter existing password"
                    : "enter new password"}
            </label>
            <input
                type="password"
                value={passwordInput}
                onChange={handlePasswordInputChange}
            />
            <button onClick={handleSubmit} disabled={apiStatus ? true : false}>
                {apiStatus ? "submitting" : "submit password"}
            </button>
        </>
    );
};

UserPassword.propTypes = {};

export default UserPassword;
