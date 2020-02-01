import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { useStyles } from "./styles";
import * as apiUtiles from "../../firebase/firebaseApiUtils";

//
// component
const UserMenu = ({ userLogged }) => {
    const [anchorEl, setAnchorEl] = useState(null); //dropdown menu state
    const classes = useStyles();

    // vars
    const menuID = "user-dropdown";
    const isMenuOpen = Boolean(anchorEl);

    // handlers
    const handleMenuOpen = e => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleSignOut = () => {
        toast.success("You have signed out");
        handleMenuClose();
        apiUtiles.signOut().catch(err => console.log(err));
    };

    return (
        <>
            {!userLogged.photoURL ? ( // if logged but no photo
                <IconButton onClick={handleMenuOpen}>
                    <AccountCircleIcon className={classes.loggedIn} />
                </IconButton>
            ) : (
                // if logged and have photo
                <IconButton onClick={handleMenuOpen}>
                    <Avatar
                        src={userLogged.photoURL}
                        alt="user photo"
                        className={classes.avatarSize}
                    />
                </IconButton>
            )}
            <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                id={menuID}
                keepMounted
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <Paper square className={classes.menuPaper}>
                    <Typography variant="button" component="p" align="center">
                        {userLogged.displayName}
                    </Typography>
                    <Typography
                        variant="caption"
                        display="block"
                        align="center"
                        gutterBottom
                    >
                        {userLogged.email}
                    </Typography>
                </Paper>
                <MenuItem>
                    <Typography variant="button" gutterBottom>
                        Edit your profile
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <Typography
                        onClick={handleSignOut}
                        variant="button"
                        gutterBottom
                    >
                        Sign out
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

UserMenu.propTypes = {
    userLogged: PropTypes.object.isRequired
};

export default UserMenu;
