import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import * as apiUtiles from "../../firebase/firebaseApiUtils";

//
// component
const UserMenu = ({ anchorEl, handleMenuClose, userLogged }) => {
    // vars
    const menuID = "header-dropdown";
    const isMenuOpen = Boolean(anchorEl);

    // handlers
    const handleSignOut = () => {
        toast.success("You have signed out");
        handleMenuClose();
        apiUtiles.signOut().catch(err => console.log(err));
    };

    return (
        <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            id={menuID}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Paper square>
                <Typography variant="button" display="block" align="center">
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
    );
};

UserMenu.propTypes = {
    anchorEl: PropTypes.object,
    handleMenuClose: PropTypes.func.isRequired,
    userLogged: PropTypes.object.isRequired
};

export default UserMenu;
