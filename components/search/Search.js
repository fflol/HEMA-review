import React, { useState, useEffect } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import * as helpers from "../../tools/helpers";

const Search = ({ products }) => {
    const [input, setInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        input === ""
            ? setSearchResult([])
            : setSearchResult(helpers.search(products, input));
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
                        {/* <h4>{prod.name}</h4> */}
                        <Link href="/prod/[id]" as={`/prod/${prod.id}`}>
                            <a>{prod.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

Search.propTypes = {};

export default Search;
