import React, { useState, useContext } from "react";
import Link from "next/link";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { userContext } from "../../tools/reactContext";
import { useStyles } from "./styles";
import Search from "../search/Search";
import UserMenu from "./UserMenu";
import SignIn from "./SignIn";

const Header = () => {
    const userLogged = useContext(userContext);

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Search />
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

export default Header;
