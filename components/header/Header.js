import React, { useState, useContext } from "react";
import Link from "next/link";
// import { toast } from "react-toastify";

import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";

import { userContext } from "../../tools/reactContext";
import { useStyles } from "./styles";
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
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }}
                        inputProps={{ "aria-label": "search" }}
                    />
                </div>
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

// Header.propTypes = {};

export default Header;
