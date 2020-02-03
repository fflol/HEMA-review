import React, { useState } from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { ConfirmDialog } from "../../components/utilComponents";
import { useStyles } from "./styles";

//
// component
const EditDropMenu = ({ handleEditOpen, handleDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const classes = useStyles();

    // vars
    const menuID = "edit-dropdown";
    const isMenuOpen = Boolean(anchorEl);

    // handlers
    const handleMenuOpen = e => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);

    return (
        <>
            <IconButton
                onClick={handleMenuOpen}
                size="small"
                className={classes.editDropButton}
            >
                <ExpandMoreIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                id={menuID}
                keepMounted
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem>
                    <Typography onClick={handleEditOpen} variant="body2">
                        Edit
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <Typography onClick={handleDialogOpen} variant="body2">
                        Delete
                    </Typography>
                </MenuItem>
            </Menu>
            <ConfirmDialog
                open={dialogOpen}
                handleClose={handleDialogClose}
                text="Content cannot be retrieved, confirm delete?"
                action={handleDelete}
            />
        </>
    );
};

EditDropMenu.propTypes = {
    handleEditOpen: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default EditDropMenu;
