import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import * as helpers from "../../tools/helpers";

const Search = ({ data }) => {
    const [input, setInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        input === ""
            ? setSearchResult([])
            : setSearchResult(helpers.search(data.products, input));
    }, [input]);
    const handleChange = e => {
        setInput(e.target.value);
        // if (input === "") setSearchResult([]);
        // else setSearchResult(helpers.search(data.products, input));
    };
    const handleSubmit = e => {
        e.preventDefault();
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleChange} />
                <button>Search</button>
            </form>
            <ul>
                {searchResult.map(prod => (
                    <li key={prod.id}>
                        <h4>{prod.name}</h4>
                    </li>
                ))}
            </ul>
        </>
    );
};

Search.propTypes = {};

export default Search;
