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
const Index = ({ products, reviews }) => {
    // console.log("products: ", products);
    const featured = helpers.findFeatured(products);
    const recentReviewed = helpers.findRecentReviewed(products, reviews);
    // console.log(recentReviewed);

    return (
        <>
            {/* <Header /> */}
            <h1>HEMA Gear Reviews</h1>
            <Search products={products} />
            <Featured featured={featured} />
            <Recent recentReviewed={recentReviewed} />
            <Footer />
        </>
    );
};

//
Index.getInitialProps = async () => {
    const db = await fetch(`${process.env.DEV_URL}/db`)
        .then(res => res.json())
        .catch(err => console.log(err));
    return {
        products: db.products,
        reviews: db.reviews
    };
};

Index.propTypes = {
    // db: PropTypes.object.isRequired
};

export default Index;
