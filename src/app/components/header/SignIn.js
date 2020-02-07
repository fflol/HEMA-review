import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as fb from "firebase/app";
import "firebase/auth";

import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";

import { useStyles } from "./styles";
import { firebase } from "../../firebase/firebaseConfig";
import * as actionCreators from "../../tools/useReduceHelpers/actionCreators";
import * as reducers from "../../tools/useReduceHelpers/reducer";
import * as dbFormat from "../../tools/formats/dbFormat";
import * as apiUtils from "../../firebase/firebaseApiUtils";

//
// component
const SignIn = () => {
    const [isSignInOpen, setIsSignInOpen] = useState(false); // for mui dialog

    const [tabValue, setTabValue] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [apiStatus, apiDispatch] = useReducer(reducers.apiStatusReducer, 0);

    // style
    const classes = useStyles();

    // handlers
    const handleOpenSignIn = () => setIsSignInOpen(true); // for mui dialog
    const handleCloseSignIn = () => setIsSignInOpen(false); // for mui dialog

    const handleEmailInput = e => setEmail(e.target.value);
    const handlePasswordInput = e => setPassword(e.target.value);

    const handleToogleSignUp = () => setTabValue(1);
    const handleChangeTab = (event, newValue) => setTabValue(newValue);

    const handleSignIn = async e => {
        e.preventDefault();
        actionCreators.beginApiCall(apiDispatch);
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
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
        actionCreators.beginApiCall(apiDispatch);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
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
                toast.success("You have signed in");
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
                var errorMessage = err.message;
                console.log(errorMessage);
            });
    };

    return (
        <>
            <Button
                size="small"
                variant="text"
                className={classes.buttonWrap}
                onClick={handleOpenSignIn}
            >
                Sign in
            </Button>

            <Dialog
                onClose={handleCloseSignIn}
                aria-labelledby="signin-dialog"
                open={isSignInOpen}
            >
                <Paper className={classes.loginDialog}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        aria-label="signin/up tab"
                        className={classes.marginBottom}
                    >
                        <Tab label="Sign in" />
                        <Tab label="Sign up" />
                    </Tabs>

                    {tabValue === 0 && (
                        <>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSignUpWithGoogle}
                                className={classes.marginBottom}
                            >
                                Sign in with Google
                            </Button>
                            <Divider />
                        </>
                    )}

                    <form
                        noValidate
                        onSubmit={tabValue === 0 ? handleSignIn : handleSignUp}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleEmailInput}
                            value={email}
                            disabled={apiStatus ? true : false}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handlePasswordInput}
                            value={password}
                            disabled={apiStatus ? true : false}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={apiStatus ? true : false}
                        >
                            {apiStatus ? "submitting" : "Sign In"}
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    {tabValue === 0 ? "Forgot password?" : " "}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    href="#"
                                    variant="body2"
                                    onClick={handleToogleSignUp}
                                >
                                    {tabValue === 0
                                        ? "Don't have an account? Sign Up"
                                        : "Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
        </>
    );
};

export default SignIn;
