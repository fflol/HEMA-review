import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const Header = () => {
    return (
        <header>
            <nav>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <button>log in</button>
            </nav>
        </header>
    );
};

Header.propTypes = {};

export default Header;
