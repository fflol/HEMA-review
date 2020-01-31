import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import NProgress from "nprogress";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./styles";
import * as helpers from "../../tools/helpers";

const Search = ({ products }) => {
    const [input, setInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const containerRef = useRef(null);

    useEffect(() => setSearchResult(helpers.search(products, input)), [input]);

    const classes = useStyles();

    // vars
    const isMenuOpen = Boolean(searchResult.length);
    const popperID = "search-auto-complete";

    // handlers
    const handleChange = e => setInput(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className={classes.grow}>
            <div ref={containerRef} className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
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
                    id={popperID}
                    open={isMenuOpen}
                    anchorEl={containerRef.current}
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
                                <Link href="/prod/[id]" as={`/prod/${prod.id}`}>
                                    <a>{prod.name}</a>
                                </Link>
                            </Typography>
                        </Paper>
                    ))}
                </Popper>
            </div>
        </form>
    );
};

Search.propTypes = {
    products: PropTypes.array.isRequired
};

export default Search;
