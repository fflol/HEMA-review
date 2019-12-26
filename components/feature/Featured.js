import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const Featured = ({ featured }) => {
    return (
        <>
            <h2>Featured Products:</h2>
            <ul>
                {featured.map(prod => (
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

Featured.propTypes = {};

export default Featured;
