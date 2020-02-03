import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ProdList from "../components/prodList/ProdList";
import * as helpers from "../tools/helpers";
import * as apiUtils from "../firebase/firebaseApiUtils";

//
// component
const Index = ({ products, setAppProducts }) => {
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => setAppProducts(products), []);

    // vars
    const highestRatedProducts = helpers.findHighRated(products);
    const recentReviewedProducts = helpers.findRecentReviewed(products);

    // handlers
    const handleTabChange = (event, newValue) => setTabValue(newValue);

    return (
        <>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="product view tab"
            >
                <Tab label="highest rate" {...helpers.a11yProps(0)} />
                <Tab label="recent reviewed" {...helpers.a11yProps(1)} />
            </Tabs>
            <Paper square>
                <Box p={1} mb={1}>
                    <ProdList
                        products={
                            tabValue === 0
                                ? highestRatedProducts
                                : recentReviewedProducts
                        }
                    />
                </Box>
            </Paper>
        </>
    );
};

//
Index.getInitialProps = async () => {
    return { products: await apiUtils.getProducts() };
};

Index.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            business: PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            }).isRequired,
            lastReview: PropTypes.shape({}).isRequired,
            name: PropTypes.string.isRequired,
            ratingAverage: PropTypes.number.isRequired,
            reviewsTotal: PropTypes.number.isRequired
        })
    ).isRequired,
    setAppProducts: PropTypes.func.isRequired
};

export default Index;