import React from "react";
import App from "next/app";
import Head from "next/head";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "firebase/auth";

import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import { userContext } from "../tools/reactContext";
import { firebase } from "../firebase/firebaseConfig";
import * as dbFormat from "../tools/dbFormat";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../styles/theme";

class MyApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        toast.configure({
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnVisibilityChange: true,
            pauseOnHover: true
        });
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
                <Head>
                    <title>HEMA Gear reviews</title>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                        key="google-font-roboto"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        key="google-font-icon"
                    />
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <userContext.Provider value={this.state.user}>
                        <Header />
                        <Component {...pageProps} />
                        <Footer />
                    </userContext.Provider>
                </ThemeProvider>
            </>
        );
    }
}

export default MyApp;
