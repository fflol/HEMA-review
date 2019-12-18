import React from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Search from "../components/search/Search";
import Featured from "../components/feature/Featured";
import Recent from "../components/recent/Recent";

import * as helpers from "../tools/helpers";

//
// component
const Index = ({ data }) => {
    const featured = helpers.findFeatured(data.products);
    const recentReviewed = helpers.findRecentReviewed(
        data.products,
        data.reviews
    );
    return (
        <>
            <Header />
            <h1>HEMA Gear Reviews</h1>
            <Search data={data} />
            <Featured featured={featured} />
            <Recent recentReviewed={recentReviewed} />
            <Footer />
        </>
    );
};

//
Index.getInitialProps = async () => {
    const db = await fetch("http://localhost:4000/db")
        .then(res => res.json())
        .catch(err => console.log(err));
    return { data: db.db };
};

Index.propTypes = {
    data: PropTypes.object.isRequired
};

export default Index;
