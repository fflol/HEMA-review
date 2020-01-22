import React from "react";
// import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import { useStyles } from "./styles";

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="caption">
                <Link href="/about">About</Link>
            </Typography>
            <br />
            <Typography variant="caption" color="textSecondary">
                {"Copyright © "}
                <Link color="inherit" href="">
                    HEMA Gear Reviews
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </footer>
    );
};

// Footer.propTypes = {};

export default Footer;
