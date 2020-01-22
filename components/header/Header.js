import React, { useState, useContext } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";

import { userContext } from "../../tools/reactContext";
import { useStyles } from "./styles";
import UserMenu from "./UserMenu";
import LogIn from "./LogIn";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const userLogged = useContext(userContext);

    // style
    const classes = useStyles();

    // handlers
    const handleMenuOpen = e => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleOpenSignIn = () => setIsSignInOpen(true);
    const handleCloseSignIn = () => setIsSignInOpen(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackbar(false);
    };

    // JSX chunks
    const displayIcon = !userLogged.email ? (
        <>
            <Button
                size="small"
                variant="text"
                className={classes.buttonWrap}
                onClick={handleOpenSignIn}
            >
                Sign in
            </Button>
            <LogIn
                isSignInOpen={isSignInOpen}
                handleCloseSignIn={handleCloseSignIn}
            />
        </>
    ) : !userLogged.photoURL ? (
        <IconButton onClick={handleMenuOpen}>
            <AccountCircleIcon className={classes.loggedIn} />
        </IconButton>
    ) : (
        <IconButton onClick={handleMenuOpen}>
            <Avatar
                src={userLogged.photoURL}
                alt="user photo"
                className={classes.avatarSize}
            />
        </IconButton>
    );

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
                {displayIcon}
                <UserMenu
                    anchorEl={anchorEl}
                    handleMenuClose={handleMenuClose}
                    userLogged={userLogged}
                />
            </Toolbar>
        </AppBar>
    );
};

// Header.propTypes = {};

export default Header;
