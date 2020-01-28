import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./styles";
import * as helpers from "../../tools/helpers";

const products = [
    {
        id: "p6ck4",
        businessID: "unykd",
        name: "SF Thermo Ventilation HEMA Jacket 800N",
        reviewTotal: 3,
        starsAverage: 4
    },
    {
        id: "dxk3s",
        businessID: "unykd",
        name: "SF HEMA Jacket 350N",
        reviewTotal: 0,
        starsAverage: 4
    },
    {
        id: "ob9db",
        businessID: "unykd",
        name: "SF Angelo Jacket 800N",
        reviewTotal: 1,
        starsAverage: 5
    },
    {
        id: "cfs5t",
        businessID: "unykd",
        name: "SF 16th C. HEMA Jacket 800N",
        reviewTotal: 2,
        starsAverage: 2
    },
    {
        id: "6u8ta",
        businessID: "unykd",
        name: "SF Mitten Gauntlets w/ Reinforced Thumb Protector",
        reviewTotal: 6,
        starsAverage: 4.5
    },
    {
        id: "a274u",
        businessID: "unykd",
        name: "SF HEMA Heavy Gloves",
        reviewTotal: 0,
        starsAverage: 3.5
    }
];

const Search = () => {
    const [input, setInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null); //dropdown menu state

    const anchorRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // updating search result
        input === ""
            ? setSearchResult([])
            : setSearchResult(helpers.search(products, input));
    }, [input]);

    useEffect(() => {
        // dropdown open/close based on searchResult
        searchResult === []
            ? setAnchorEl(null)
            : setAnchorEl(anchorRef.current);
        // anchorRef && anchorRef.current.firstChild.focus();
    }, [searchResult]);

    const classes = useStyles();

    // vars
    const menuID = "search-dropdown";
    const isMenuOpen = Boolean(anchorEl);

    // handlers
    const handleChange = e => {
        setInput(e.target.value);
        // anchorRef.current.firstChild.focus();
    };

    const handleMenuOpen = e => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div ref={containerRef} className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        ref={anchorRef}
                        type="search"
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }}
                        inputProps={{ "aria-label": "search" }}
                        onChange={handleChange}
                    />
                    <Popper
                        id={menuID}
                        open={isMenuOpen}
                        anchorEl={anchorEl}
                        placement="bottom-start"
                        keepMounted
                        container={containerRef.current}
                    >
                        {searchResult.map(prod => (
                            <Paper
                                key={prod.id}
                                square
                                className={classes.popperPaper}
                            >
                                <Typography variant="subtitle1">
                                    <Link
                                        href="/prod/[id]"
                                        as={`/prod/${prod.id}`}
                                    >
                                        <a>{prod.name}</a>
                                    </Link>
                                </Typography>
                            </Paper>
                        ))}
                    </Popper>
                </div>
            </form>
            {/* <Menu
                anchorEl={anchorEl}
                autoFocus={false}
                disableAutoFocusItem
                //getContentAnchorEl={null}
                //anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                id={menuID}
                keepMounted
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                {searchResult.map(prod => (
                    <MenuItem key={prod.id}>
                        <Typography variant="subtitle1">
                            <Link href="/prod/[id]" as={`/prod/${prod.id}`}>
                                <a>{prod.name}</a>
                            </Link>
                        </Typography>
                    </MenuItem>
                ))}
            </Menu> */}
        </>
    );
};

Search.propTypes = {};

export default Search;
