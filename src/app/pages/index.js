import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ProdList from "../components/prodList/ProdList";
import * as helpers from "../tools/helpers";
import * as apiUtils from "../firebase/firebaseApiUtils";
import * as storageApis from "../firebase/firebaseStorageApis";
import * as propTypeFormats from "../tools/formats/propTypeFormat";

//
// component
const Index = ({ productsReceived, setAppProducts }) => {
    const [tabValue, setTabValue] = useState(0);
    const [products, setProducts] = useState(productsReceived);

    useEffect(() => {
        (async () =>
            setProducts(
                await storageApis.addPhotoUrlToProducts(productsReceived)
            ))(); // on mount, add photoUrl in products
        setAppProducts(products);
    }, []);

    // vars
    const highestRatedProducts = helpers.findHighRated(products);
    const recentReviewedProducts = helpers.findRecentReviewed(products);

    // handlers
    const handleTabChange = (event, newValue) => setTabValue(newValue);

    return (
        <>
            <Tabs
                value={tabValue}
                indicatorColor="primary"
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
    return { productsReceived: await apiUtils.getProducts() };
};

Index.propTypes = {
    productsReceived: propTypeFormats.productsRecivedType,
    setAppProducts: PropTypes.func.isRequired
};

export default Index;
