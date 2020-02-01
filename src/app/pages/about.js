import React from "react";
// import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const about = () => {
    return (
        <Paper square style={{ height: "100%" }}>
            <Box p={1} mb={1}>
                <Typography variant="body1">
                    As/is, nothing really much to say here. Probably will update
                    who I am in the future.
                </Typography>
            </Box>
        </Paper>
    );
};

// about.propTypes = {};

export default about;
