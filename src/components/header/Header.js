import React, { useContext } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { userContext } from "../../tools/reactContext";
import { useStyles } from "./styles";
import Search from "../search/Search";
import UserMenu from "./UserMenu";
import SignIn from "./SignIn";

const Header = ({ products }) => {
    const userLogged = useContext(userContext);

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Link href="/">
                    <a className={classes.logoContainer}>
                        <img
                            src="/logo-icon.png"
                            alt="logo-icon"
                            className={classes.logo}
                        />
                        <img
                            src="/logo-text.png"
                            alt="logo-text"
                            className={`${classes.logo} ${classes.logoText}`}
                        />
                    </a>
                </Link>
                <div className={classes.grow} />
                <Search products={products} />
                <div className={classes.grow} />
                {!userLogged.email ? ( //check if user is logged in
                    <SignIn />
                ) : (
                    <UserMenu userLogged={userLogged} />
                )}
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    products: PropTypes.array.isRequired
};

export default Header;
