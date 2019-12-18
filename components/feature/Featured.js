import React from "react";
import PropTypes from "prop-types";

const Featured = ({ featured }) => {
    return (
        <>
            <h2>Featured Products:</h2>
            <ul>
                {featured.map(prod => (
                    <li key={prod.id}>
                        <h3>{prod.name}</h3>
                        <p>stars: {prod.starsAverage}</p>
                        <p>reviews:{prod.reviewTotal}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

Featured.propTypes = {};

export default Featured;
