import { useState } from "react";
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
const Index = ({ products }) => {
    const [tabValue, setTabValue] = useState(0);

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
    products: PropTypes.array.isRequired
};

export default Index;
