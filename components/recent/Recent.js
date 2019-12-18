import React from "react";
import PropTypes from "prop-types";

const Recent = ({ recentReviewed }) => {
    return (
        <>
            <h2>Recent Reviewed Products:</h2>
            <ul>
                {recentReviewed.map(prod => (
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

Recent.propTypes = {};

export default Recent;
