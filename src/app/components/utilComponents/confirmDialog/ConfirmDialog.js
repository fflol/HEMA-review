import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

//
// component
const ConfirmDialog = ({ open, handleClose, text, action }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="confirmation dialog"
        >
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Disagree
                </Button>
                <Button autoFocus onClick={action} color="primary">
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
};

export default ConfirmDialog;
