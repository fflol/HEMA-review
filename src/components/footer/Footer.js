import React from "react";
import Link from "next/link";
// import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

import { useStyles } from "./styles";

const Footer = () => {
    const classes = useStyles();

    return (
        <Container component="footer" maxWidth="md" className={classes.footer}>
            <Typography variant="caption">
                <Link href="/about">
                    <a>About</a>
                </Link>
            </Typography>
            <br />
            <Typography variant="caption" color="textSecondary">
                {"Copyright © "}
                <MuiLink color="inherit" href="">
                    HEMA Gear Reviews
                </MuiLink>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </Container>
    );
};

// Footer.propTypes = {};

export default Footer;
