import React from "react";
import PropTypes from "prop-types";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Search from "../components/search/Search";

import Featured from "../components/feature/Featured";
import Recent from "../components/recent/Recent";

const index = props => {
    return (
        <>
            <Header />
            <h1>HEMA Gear Reviews</h1>
            <Search />
            <Featured />
            <Recent />
            <Footer />
        </>
    );
};

index.propTypes = {};

export default index;
