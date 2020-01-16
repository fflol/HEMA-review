import { useState, useReducer } from "react";
import * as fb from "firebase/app";
import "firebase/auth";

import { firebase } from "../firebase/firebaseConfig";
import * as actionCreators from "../tools/actionCreators";
import * as reducers from "../tools/reducer";
import * as dbFormat from "../tools/dbFormat";
import * as apiUtils from "../firebase/firebaseApiUtils";

//
// component
const Auth = () => {
    const [toSignIn, setToSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    // handlers
    const handleEmailInput = e => setEmail(e.target.value);
    const handlePasswordInput = e => setPassword(e.target.value);

    const handleSignIn = async e => {
        e.preventDefault();
        // if (firebase.auth().currentUser) firebase.auth().signOut();

        if (email.length < 4)
            return console.log("Please enter an email address.");

        if (password.length < 4) return console.log("Please enter a password.");

        actionCreators.beginApiCall(apiDispatch);
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                actionCreators.apiCallSuccess(apiDispatch);
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === "auth/wrong-password")
                    console.log("Wrong password.");
                else {
                    console.log(errorMessage);
                }
                console.log(error);
                actionCreators.apiCallError(apiDispatch);
            });
    };

    const handleSignUp = async e => {
        e.preventDefault();

        if (firebase.auth().currentUser) firebase.auth().signOut();

        if (email.length < 4)
            return console.log("Please enter an email address.");

        if (password.length < 4) return console.log("Please enter a password.");

        actionCreators.beginApiCall(apiDispatch);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                actionCreators.apiCallSuccess(apiDispatch);
                const timeRegistered = fb.firestore.Timestamp.now();
                const provider = res.user.providerData[0].providerId;
                const {
                    displayName,
                    email,
                    photoURL,
                    emailVerified,
                    uid
                } = res.user;
                apiUtils.setUser(
                    uid,
                    dbFormat.createUser(
                        displayName,
                        email,
                        photoURL,
                        emailVerified,
                        provider,
                        timeRegistered,
                        0
                    )
                );
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == "auth/weak-password") {
                    console.log("The password is too weak.");
                } else {
                    console.log(errorMessage);
                }
                console.log(error);
                actionCreators.apiCallError(apiDispatch);
            });
    };

    const handleSignUpWithGoogle = async () => {
        const provider = new fb.auth.GoogleAuthProvider();
        actionCreators.beginApiCall(apiDispatch);
        await firebase
            .auth()
            .signInWithPopup(provider)
            .then(res => {
                actionCreators.apiCallSuccess(apiDispatch);
                if (res.additionalUserInfo.isNewUser) {
                    const timeRegistered = fb.firestore.Timestamp.now();
                    const provider = res.user.providerData[0].providerId;
                    const {
                        displayName,
                        email,
                        photoURL,
                        emailVerified,
                        uid
                    } = res.user;
                    apiUtils.setUser(
                        uid,
                        dbFormat.createUser(
                            displayName,
                            email,
                            photoURL,
                            emailVerified,
                            provider,
                            timeRegistered,
                            0
                        )
                    );
                }
            })
            .catch(err => {
                actionCreators.apiCallError(apiDispatch);
                // var errorCode = err.code;
                var errorMessage = err.message;
                // var email = err.email;
                // var credential = err.credential;
                console.log(errorMessage);
            });
    };

    return (
        <>
            <button onClick={() => setToSignIn(true)}>sign in</button>
            <button onClick={() => setToSignIn(false)}>sign up</button>
            <form onSubmit={toSignIn ? handleSignIn : handleSignUp}>
                <h3>{toSignIn ? "Sign in" : "Sign up"}</h3>
                <label>user name</label>
                <input
                    type="text"
                    onChange={handleEmailInput}
                    value={email}
                    disabled={apiStatus ? true : false}
                />
                <label>password</label>
                <input
                    type="password"
                    onChange={handlePasswordInput}
                    value={password}
                    disabled={apiStatus ? true : false}
                />
                <button>{toSignIn ? "sign in" : "sign up"}</button>
            </form>
            <button onClick={handleSignUpWithGoogle}>
                sign in with Google
            </button>
        </>
    );
};

//
Auth.propTypes = {
    // db: PropTypes.object.isRequired
};

export default Auth;
