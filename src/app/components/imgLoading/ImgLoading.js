import React, { useState } from "react";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

import { useStyles } from "./styles";

const ImgLoading = ({ component: Component, ...rest }) => {
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();

    return (
        <>
            {isLoading && <CircularProgress size={24} />}
            <Component
                onLoad={() => setIsLoading(false)}
                style={{ fontSize: 0 }}
                {...rest}
            />
        </>
    );
};

ImgLoading.propTypes = {
    component: PropTypes.string.isRequired
};

export default ImgLoading;
