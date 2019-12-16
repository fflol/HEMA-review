import React from "react";
import PropTypes from "prop-types";

const Search = props => {
    const handleSubmit = e => e.preventDefault();
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" />
            <button>Search</button>
        </form>
    );
};

Search.propTypes = {};

export default Search;
