// import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const Recent = ({ recentReviewed }) => {
    return (
        <>
            <h2>Recent Reviewed Products:</h2>
            <ul>
                {recentReviewed.map(prod => (
                    <li key={prod.id}>
                        <h3>
                            <Link href="/prod/[id]" as={`/prod/${prod.id}`}>
                                <a>{prod.name}</a>
                            </Link>
                        </h3>
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
