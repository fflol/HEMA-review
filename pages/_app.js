import React from "react";
import App from "next/app";
import { ToastContainer } from "react-toastify";
import "firebase/auth";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { userContext } from "../tools/reactContext";
import { firebase } from "../firebase/firebaseConfig";
import * as dbFormat from "../tools/dbFormat";

import "react-toastify/dist/ReactToastify.css";

class MyApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        // listening auth lifecycle, set user info
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const {
                    displayName,
                    email,
                    photoURL,
                    emailVerified,
                    uid
                } = user; // get properties from Firebase user obj
                this.setState({
                    user: {
                        uid,
                        ...dbFormat.createUser(
                            displayName,
                            email,
                            photoURL,
                            emailVerified
                        )
                    }
                });
            } else {
                this.setState({ user: {} });
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <userContext.Provider value={this.state.user}>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                    />
                </userContext.Provider>
            </>
        );
    }
}

export default MyApp;
