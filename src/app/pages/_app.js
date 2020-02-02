import React, { useState, useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "firebase/auth";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import { userContext } from "../tools/reactContext";
import { firebase } from "../firebase/firebaseConfig";
import * as dbFormat from "../tools/dbFormat";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../styles/theme";
import { useStyles } from "../styles/styles";

// spinner
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

//
// component
const MyApp = ({ Component, pageProps }) => {
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        toast.configure({
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnVisibilityChange: true,
            pauseOnHover: true
        });
        // listening auth lifecycle, set user info
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const {
                    displayName,
                    email,
                    photoURL,
                    emailVerified,
                    uid,
                    providerId
                } = user; // get properties from Firebase user obj
                setUser({
                    uid,
                    ...dbFormat.createUser(
                        displayName,
                        email,
                        photoURL,
                        emailVerified,
                        providerId
                    )
                });
            } else {
                setUser({});
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <Head>
                <title>HEMA Gear reviews</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <userContext.Provider value={user}>
                    <Grid
                        container
                        direction="column"
                        className={classes.bodyWrapper}
                    >
                        <Header products={products} />
                        <Grid item container className={classes.gridItemGrow}>
                            <Container
                                component="main"
                                maxWidth="md"
                                className={classes.main}
                            >
                                <Component
                                    setAppProducts={setProducts}
                                    {...pageProps}
                                />
                            </Container>
                        </Grid>
                        <Footer />
                    </Grid>
                </userContext.Provider>
            </ThemeProvider>
        </>
    );
};

export default MyApp;
